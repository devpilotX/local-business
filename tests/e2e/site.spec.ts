import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { pages } from "../../src/lib/content";
test("public pages render, have unique titles and no draft placeholders outside policies", async ({
  page,
}) => {
  const titles = new Set<string>();
  for (const path of [
    "/",
    "/services",
    "/guides",
    "/contact",
    ...pages.map((p) => `/${p.slug}`),
  ]) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
    await expect(page.locator("h1"), path).toHaveCount(1);
    const title = await page.title();
    expect(titles.has(title), path).toBe(false);
    titles.add(title);
    await expect(page.locator("body")).not.toContainText("—");
    expect(
      await page.locator('link[rel="canonical"]').getAttribute("href"),
    ).toContain(path === "/" ? "localhost:3000" : path);
  }
});
test("public navigation and SEO safety", async ({ page, request }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "easier to find",
  );
  await page
    .getByRole("button", { name: "Can I start with just one service?" })
    .click();
  await expect(
    page.getByText("Yes. We can scope a profile review", { exact: false }),
  ).toBeVisible();
  expect((await request.get("/robots.txt")).status()).toBe(200);
  expect(await (await request.get("/robots.txt")).text()).toContain(
    "Disallow: /",
  );
  expect(
    (await request.get("/opengraph-image")).headers()["content-type"],
  ).toContain("image");
  expect((await request.get("/manifest.webmanifest")).status()).toBe(200);
  expect((await request.get("/does-not-exist")).status()).toBe(404);
});
test("public links resolve without broken internal routes", async ({
  page,
  request,
}) => {
  const links = new Set<string>();
  for (const path of [
    "/",
    "/services",
    "/guides",
    ...pages.map((p) => `/${p.slug}`),
  ]) {
    await page.goto(path);
    for (const href of await page
      .locator('a[href^="/"]')
      .evaluateAll((nodes) => nodes.map((n) => n.getAttribute("href")!)))
      links.add(href);
  }
  for (const link of links) {
    const response = await request.get(link);
    expect(response.status(), link).toBeLessThan(400);
  }
});
test("contact saves once and shows a real saved state", async ({ page }) => {
  await page.goto("/contact");
  await page.getByLabel("Your name", { exact: true }).fill("Jordan QA");
  await page.getByLabel("Business name").fill("QA neighbourhood cafe");
  await page
    .getByLabel("Email address", { exact: true })
    .fill("website-qa@example.test");
  await page
    .getByLabel("Tell us what you need")
    .fill(
      "We need a website with clear opening hours and a useful contact form.",
    );
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Send enquiry", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Your enquiry is saved." }),
  ).toBeVisible();
});
test("contact failure preserves entered data", async ({ page }) => {
  await page.route("**/api/inquiries", (r) =>
    r.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({
        error: "The service is temporarily unavailable.",
      }),
    }),
  );
  await page.goto("/contact");
  await page.getByLabel("Your name", { exact: true }).fill("Jordan QA");
  await page.getByLabel("Business name").fill("QA cafe");
  await page
    .getByLabel("Email address", { exact: true })
    .fill("qa@example.test");
  await page
    .getByLabel("Tell us what you need")
    .fill("We would like to improve our business website.");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Send enquiry", exact: true }).click();
  await expect(
    page.getByRole("form", { name: "Project enquiry" }).getByRole("alert"),
  ).toContainText("temporarily unavailable");
  await expect(page.getByLabel("Business name")).toHaveValue("QA cafe");
});
test("admin endpoints reject unauthenticated access and cross-origin writes", async ({
  request,
  page,
}) => {
  expect((await request.get("/api/crm/leads")).status()).toBe(401);
  expect((await request.get("/api/crm/export")).status()).toBe(401);
  expect(
    (
      await request.post("/api/inquiries", {
        headers: { origin: "https://attacker.test" },
        data: {},
      })
    ).status(),
  ).toBe(403);
  expect(
    (
      await request.post("/api/auth/sign-up/email", {
        headers: { origin: "http://localhost:3000" },
        data: {
          name: "Attacker",
          email: "attacker@example.test",
          password: "not-a-real-password-123",
        },
      })
    ).status(),
  ).toBeGreaterThanOrEqual(400);
  await page.goto("/admin");
  await expect(page).toHaveURL(/admin\/login/);
});
test("CRM login, lead conversion, project task, content edits and export", async ({
  page,
  request,
}) => {
  await page.goto("/admin/login");
  await page
    .getByLabel("Email address", { exact: true })
    .fill("qa-admin@example.test");
  await page
    .getByLabel("Password", { exact: true })
    .fill(process.env.QA_PASSWORD!);
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Business overview" }),
  ).toBeVisible();
  await page.goto("/admin/leads");
  await page
    .getByRole("button", { name: "Convert", exact: true })
    .first()
    .click();
  await page.getByRole("button", { name: "OK", exact: true }).click();
  await expect(
    page.getByText("Client and project created", { exact: true }),
  ).toBeVisible();
  const clients = await (await page.request.get("/api/crm/clients")).json();
  expect(clients.total).toBeGreaterThan(0);
  const projects = await (await page.request.get("/api/crm/projects")).json();
  const project = projects.data[0];
  const task = await page.request.post("/api/crm/tasks", {
    headers: { origin: "http://localhost:3000" },
    data: {
      name: "QA project review",
      clientId: project.clientId,
      projectId: project.id,
      status: "in-progress",
    },
  });
  expect(task.status()).toBe(201);
  await page.goto("/admin/tasks");
  await expect(
    page.getByRole("cell", { name: "QA project review", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("row")
    .filter({ hasText: "QA project review" })
    .getByRole("button", { name: "Edit", exact: true })
    .click();
  await page
    .getByLabel("Name", { exact: true })
    .fill("QA project review updated");
  await page.getByRole("button", { name: "OK", exact: true }).click();
  await expect(
    page.getByRole("cell", { name: "QA project review updated", exact: true }),
  ).toBeVisible();
  const content = await (
    await page.request.get("/api/crm/content?search=about")
  ).json();
  const about = content.data.find((r: { slug: string }) => r.slug === "about");
  expect(about).toBeTruthy();
  const edit = await page.request.patch(`/api/crm/content/${about.id}`, {
    headers: { origin: "http://localhost:3000" },
    data: {
      version: about.version,
      values: {
        summary:
          "We plan practical digital work around the way your local business serves its customers.",
      },
    },
  });
  expect(edit.status()).toBe(200);
  await page.goto("/about");
  await expect(
    page.getByText(
      "We plan practical digital work around the way your local business serves its customers.",
      { exact: true },
    ),
  ).toBeVisible();
  const csv = await page.request.get("/api/crm/export?resource=clients");
  expect(csv.status()).toBe(200);
  expect(await csv.text()).toContain("QA neighbourhood cafe");
  await page.goto("/admin/clients");
  await page.getByRole("button", { name: "Sign out", exact: true }).click();
  await expect(page).toHaveURL(/admin\/login/);
  expect((await request.get("/api/crm/leads")).status()).toBe(401);
});
test("desktop and mobile accessibility, overflow and menu", async ({
  page,
}) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 960 });
    for (const path of ["/", "/services", "/contact", "/privacy"]) {
      await page.goto(path);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        `${path} ${width}`,
      ).toBe(true);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(
        results.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => n.target),
        })),
        `${path} ${width}`,
      ).toEqual([]);
    }
    if (width === 390) {
      await page.goto("/");
      await page
        .getByRole("button", { name: "Open menu", exact: true })
        .click();
      await expect(page.getByRole("dialog")).toBeVisible();
      await page
        .getByRole("navigation", { name: "Mobile navigation" })
        .getByRole("link", { name: "Services", exact: true })
        .click();
      await expect(page).toHaveURL(/\/services$/);
      await expect(page.getByRole("dialog")).toHaveCount(0);
    }
  }
});
test("theme and reduced motion remain readable", async ({ page }) => {
  await page.addInitScript(() => {
    if (!window.localStorage.getItem("techcyme-theme")) {
      window.localStorage.setItem("techcyme-theme", "light");
    }
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const themeButton = page.getByRole("button", {
    name: "Toggle colour theme",
    exact: true,
  });
  await expect(themeButton).toHaveAttribute("aria-pressed", "false");
  await themeButton.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(themeButton).toHaveAttribute("aria-pressed", "true");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2aa"])
    .analyze();
  expect(
    results.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.target),
    })),
  ).toEqual([]);
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(
    page.getByRole("button", {
      name: "Toggle colour theme",
      exact: true,
    }),
  ).toHaveAttribute("aria-pressed", "true");
});

test("every CRM resource enforces authentication and private caching", async ({
  request,
}) => {
  const id = "00000000-0000-4000-8000-000000000001";
  for (const resource of [
    "leads",
    "clients",
    "projects",
    "tasks",
    "content",
    "settings",
    "notifications",
    "activity",
  ]) {
    const response = await request.get(`/api/crm/${resource}`);
    expect(response.status(), resource).toBe(401);
    expect(response.headers()["cache-control"], resource).toContain("no-store");
    expect(response.headers()["x-robots-tag"], resource).toContain("noindex");
    for (const method of ["POST", "PATCH", "DELETE"]) {
      const path = `/api/crm/${resource}${method === "POST" ? "" : `/${id}`}`;
      const result = await request.fetch(path, {
        method,
        headers: { origin: "http://localhost:3000" },
        data: { version: 1 },
      });
      expect(result.status(), `${method} ${path}`).toBe(401);
    }
  }
  const conversion = await request.post(`/api/crm/leads/${id}/convert`, {
    headers: { origin: "http://localhost:3000" },
    data: { version: 1 },
  });
  expect(conversion.status()).toBe(401);
});

test("all CRM screens load and authenticated CRUD preserves integrity", async ({
  page,
}) => {
  await page.goto("/admin/login");
  await page
    .getByLabel("Email address", { exact: true })
    .fill("qa-admin@example.test");
  await page
    .getByLabel("Password", { exact: true })
    .fill(process.env.QA_PASSWORD!);
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Business overview" }),
  ).toBeVisible();
  for (const resource of [
    "leads",
    "clients",
    "projects",
    "tasks",
    "content",
    "settings",
    "notifications",
    "activity",
  ]) {
    const response = await page.goto(`/admin/${resource}`);
    expect(response?.status(), resource).toBe(200);
    await expect(page.locator("h1"), resource).toHaveText(
      resource[0].toUpperCase() + resource.slice(1),
    );
    await expect(
      page.getByText("Records could not be loaded", { exact: true }),
    ).toHaveCount(0);
    const api = await page.request.get(`/api/crm/${resource}`);
    expect(api.status(), resource).toBe(200);
    expect(Array.isArray((await api.json()).data), resource).toBe(true);
  }
  const headers = { origin: "http://localhost:3000" };
  const created = await page.request.post("/api/crm/clients", {
    headers,
    data: {
      name: "CRUD QA",
      business: "Lifecycle QA",
      email: "lifecycle@example.test",
    },
  });
  expect(created.status()).toBe(201);
  const client = (await created.json()).data;
  const updated = await page.request.patch(`/api/crm/clients/${client.id}`, {
    headers,
    data: { version: client.version, values: { notes: "QA lifecycle update" } },
  });
  expect(updated.status()).toBe(200);
  const current = (await updated.json()).data;
  expect(current.version).toBe(client.version + 1);
  const stale = await page.request.patch(`/api/crm/clients/${client.id}`, {
    headers,
    data: { version: client.version, values: { notes: "Must not overwrite" } },
  });
  expect(stale.status()).toBe(409);
  const forbidden = await page.request.patch(`/api/crm/clients/${client.id}`, {
    headers: { origin: "https://attacker.test" },
    data: { version: current.version, values: { notes: "Must not overwrite" } },
  });
  expect(forbidden.status()).toBe(403);
  const read = await page.request.get(`/api/crm/clients/${client.id}`);
  expect((await read.json()).data.notes).toBe("QA lifecycle update");
  const deleted = await page.request.delete(`/api/crm/clients/${client.id}`, {
    headers,
    data: { version: current.version },
  });
  expect(deleted.status()).toBe(200);
  expect(
    (await page.request.get(`/api/crm/clients/${client.id}`)).status(),
  ).toBe(404);
  const readOnly = await page.request.post("/api/crm/notifications", {
    headers,
    data: {},
  });
  expect(readOnly.status()).toBe(403);
  const invalid = await page.request.get("/api/crm/nonexistent");
  expect(invalid.status()).toBe(404);
});

test("every service page shows its illustration", async ({ page }) => {
  for (const slug of pages
    .map((p) => p.slug)
    .filter((s) => s.startsWith("services/"))) {
    await page.goto(`/${slug}`);
    const art = page.locator(".page-hero .art");
    await expect(art, slug).toBeVisible();
    await expect(art.locator(".art-stage"), slug).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  }
  await page.goto("/services");
  await expect(page.locator(".service-tile .art")).toHaveCount(8);
});

test("admin workspace renders without console warnings", async ({ page }) => {
  const messages: string[] = [];
  page.on("console", (m) => {
    if (["warning", "error"].includes(m.type())) messages.push(m.text());
  });
  await page.goto("/admin/login");
  await page
    .getByLabel("Email address", { exact: true })
    .fill("qa-admin@example.test");
  await page
    .getByLabel("Password", { exact: true })
    .fill(process.env.QA_PASSWORD!);
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Business overview" }),
  ).toBeVisible();
  await page.goto("/admin/leads");
  await expect(page.locator("h1")).toHaveText("Leads");
  await expect(
    page.getByRole("navigation", { name: "Workspace" }).getByRole("link", {
      name: "Leads",
    }),
  ).toBeVisible();
  expect(messages.filter((m) => /deprecated|Warning/i.test(m))).toEqual([]);
});
