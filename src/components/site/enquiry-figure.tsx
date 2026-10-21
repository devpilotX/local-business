// Isometric "enquiry path" figure, drawn with the Anatomy kit
// (github.com/wheresryan22/anatomy, MIT). Geometry runs on the server and the
// client receives finished SVG paths. Painter's order: base, wires, then
// objects from back (small x + y) to front.
import {
  cylinder,
  dotGrid,
  fitProjection,
  iso,
  pathOf,
  segment,
  sideMatrix,
  slabOf,
  type Flat,
  type Plan,
  type Point3,
} from "@/components/iso/iso-kit";
import {
  Dots,
  FaceText,
  IsoFigure,
  Line,
  Plate,
  Solid,
  Wire,
} from "@/components/iso/draw";

const WIDTH = 640;
const HEIGHT = 370;

const BASE: Plan = { x: -130, y: -58, w: 260, d: 116, r: 10 };
const BASE_H = 10;
const FRONT = BASE.y + BASE.d;

const SHOP: Plan = { x: -112, y: -36, w: 52, d: 44, r: 2 };
const SHOP_H = 30;
const SHOP_FRONT = SHOP.y + SHOP.d;
const PIN: Flat = [-86, -14];

const PANEL: Plan = { x: -28, y: -8, w: 62, d: 4, r: 1 };
const PANEL_Z = 12;
const PANEL_H = 40;
const PANEL_FRONT = PANEL.y + PANEL.d;

const CAB: Plan = { x: 62, y: -36, w: 48, d: 44, r: 2 };
const CAB_H = 42;
const CAB_FRONT = CAB.y + CAB.d;

const corners = ({ x, y, w, d }: Plan, z0: number, z1: number): Point3[] =>
  [x, x + w].flatMap((px) =>
    [y, y + d].flatMap((py) => [z0, z1].map((z) => [px, py, z] as Point3)),
  );

const P = fitProjection(
  [
    ...corners(BASE, -BASE_H - 4, 0),
    ...corners(SHOP, 0, 58),
    ...corners(CAB, 0, 48),
  ],
  WIDTH,
  HEIGHT,
  { pad: 10 },
);

const at = (point: Point3) => iso(point, P);
const slab = (plan: Plan, z: number, h: number, steps = 6) =>
  slabOf(plan, z, h, P, steps);
const onGround = (points: [number, number][]) =>
  points.map(([x, y]) => at([x, y, 0]));

// Base, feet and ruler ticks along the front edge.
const base = slab(BASE, -BASE_H, BASE_H, 8);
const feet = [
  [BASE.x + 18, BASE.y + 16],
  [BASE.x + BASE.w - 18, BASE.y + 16],
  [BASE.x + 18, FRONT - 16],
  [BASE.x + BASE.w - 18, FRONT - 16],
].map(([x, y]) => cylinder(x, y, 5, -BASE_H - 4, 4, P, 24));
const ticks = (() => {
  const minor: string[] = [];
  const major: string[] = [];
  for (let x = BASE.x + 14; x <= BASE.x + BASE.w - 14; x += 6) {
    const isMajor = Math.round((x - BASE.x - 14) / 6) % 5 === 0;
    (isMajor ? major : minor).push(
      segment([x, FRONT - 2, 0], [x, FRONT - (isMajor ? 8 : 5), 0], P),
    );
  }
  return { minor: minor.join(""), major: major.join("") };
})();
const grid = dotGrid(BASE.x + 12, BASE.y + 10, 31, 9, 8, 0, P);

// Wires on the bench top: shop to website, website to records.
const wireA = onGround([
  [-86, SHOP_FRONT + 1],
  [-86, 34],
  [3, 34],
  [3, 7],
]);
const wireB = onGround([
  [3, 34],
  [86, 34],
  [86, CAB_FRONT + 1],
]);
const routeA = pathOf(wireA);
const routeB = pathOf(wireB);

// Shopfront.
const shop = slab(SHOP, 0, SHOP_H);
const shopRoof = slab({ x: -115, y: -39, w: 58, d: 50, r: 2 }, SHOP_H, 4);
const awning = slab({ x: SHOP.x, y: SHOP_FRONT, w: SHOP.w, d: 9, r: 1 }, 19, 3);
const shopFace = sideMatrix([SHOP.x, SHOP_FRONT], SHOP_H, P, "left");
const pinStem = segment([PIN[0], PIN[1], SHOP_H + 4], [PIN[0], PIN[1], 49], P);
const pinHead = cylinder(PIN[0], PIN[1], 7, 49, 5, P, 32);
const pinDot = cylinder(PIN[0], PIN[1], 2.2, 54, 0.6, P, 20);

// Website monitor.
const foot = slab({ x: -6, y: -16, w: 18, d: 22, r: 3 }, 0, 2.5);
const neck = slab({ x: 0, y: -10, w: 6, d: 3, r: 0.5 }, 2.5, PANEL_Z - 2.5, 2);
const panel = slab(PANEL, PANEL_Z, PANEL_H, 2);
const panelFace = sideMatrix(
  [PANEL.x, PANEL_FRONT],
  PANEL_Z + PANEL_H,
  P,
  "left",
);

// Records cabinet.
const cab = slab(CAB, 0, CAB_H);
const cabFace = sideMatrix([CAB.x, CAB_FRONT], CAB_H, P, "left");
const cabCap = slab({ x: 60, y: -38, w: 52, d: 48, r: 2 }, CAB_H, 3);
const card = slab({ x: 71, y: -29, w: 26, d: 18, r: 1.5 }, CAB_H + 3, 1.4, 3);
const lamp = cylinder(103, -30, 2.4, CAB_H + 3, 2, P, 20);

const baseFace = sideMatrix([BASE.x, FRONT], 0, P, "left");

export function EnquiryFigure() {
  return (
    <div className="iso">
      <Plate
        fig="Fig. 1"
        title="Enquiry path"
        hint="Illustrative"
        readout="found / visited / followed up"
        caption="A customer finds the listing, visits the website and sends an enquiry that is saved with a follow-up task."
      >
        <IsoFigure
          width={WIDTH}
          height={HEIGHT}
          label="Isometric drawing of a shopfront with a map pin, a website on a monitor and a records cabinet, joined by wires that carry an enquiry from one to the next."
        >
          {feet.map((f, i) => (
            <Solid key={`foot-${i}`} paths={f} tone="mid" />
          ))}
          <Solid paths={base} tone="hi" halo />
          <g transform={baseFace}>
            <FaceText
              transform="translate(44 6.6)"
              size={4.2}
              tone="mid"
              anchor="middle"
            >
              01 FOUND ON GOOGLE
            </FaceText>
            <FaceText
              transform="translate(133 6.6)"
              size={4.2}
              tone="mid"
              anchor="middle"
            >
              02 VISITS THE SITE
            </FaceText>
            <FaceText
              transform="translate(216 6.6)"
              size={4.2}
              tone="mid"
              anchor="middle"
            >
              03 FOLLOWED UP
            </FaceText>
          </g>
          <Dots points={grid} size={0.55} tone="faint" />
          <Line d={ticks.minor} tone="lo" />
          <Line d={ticks.major} tone="mid" />

          <Wire
            from={wireA[0]!}
            to={wireA.at(-1)!}
            via={wireA.slice(1, -1)}
            tone="mid"
            ends="both"
          />
          <Wire
            from={wireB[0]!}
            to={wireB.at(-1)!}
            via={wireB.slice(1, -1)}
            tone="mid"
            ends="to"
          />
          <Line d={routeA} tone="green" flow />
          <Line d={routeB} tone="green" flow />
          <circle className="fig-packet" r="2.6">
            <animateMotion dur="3.2s" repeatCount="indefinite" path={routeA} />
          </circle>
          <circle className="fig-packet" r="2.6">
            <animateMotion
              dur="3.2s"
              begin="1.6s"
              repeatCount="indefinite"
              path={routeB}
            />
          </circle>

          {/* Shopfront with a map pin */}
          <Solid paths={shop} tone="hi" />
          <g transform={shopFace}>
            <rect
              className="fig-soft-fill"
              x="5"
              y="11"
              width="11"
              height="10"
            />
            <rect
              className="fig-soft-fill"
              x="36"
              y="11"
              width="11"
              height="10"
            />
            <rect className="fig-ink" x="20" y="12" width="12" height="18" />
            <rect
              className="fig-accent-fill"
              x="29.4"
              y="20"
              width="1.4"
              height="1.4"
            />
            <FaceText
              transform="translate(26 6.2)"
              size={3.2}
              tone="hi"
              anchor="middle"
            >
              OPEN
            </FaceText>
          </g>
          <Solid paths={shopRoof} tone="hi" />
          <Solid paths={awning} tone="hi" className="fig-accent" />
          <Line d={pinStem} tone="hi" />
          <Solid paths={pinHead} tone="hi" className="fig-accent" />
          <Solid paths={pinDot} tone="hi" lit />

          {/* Website on a monitor */}
          <Solid paths={foot} tone="hi" />
          <Solid paths={neck} tone="hi" />
          <Solid paths={panel} tone="hi" />
          <g transform={panelFace}>
            <rect className="fig-soft-fill" x="2" y="2" width="58" height="5" />
            <circle className="fig-ink" cx="5" cy="4.5" r="0.9" />
            <circle className="fig-ink" cx="8" cy="4.5" r="0.9" />
            <circle className="fig-ink" cx="11" cy="4.5" r="0.9" />
            <rect className="fig-ink" x="6" y="11" width="32" height="3" />
            <rect
              className="fig-soft-fill"
              x="6"
              y="16"
              width="24"
              height="2.2"
            />
            <rect
              className="fig-soft-fill"
              x="6"
              y="19.6"
              width="28"
              height="2.2"
            />
            <rect
              className="fig-accent-fill"
              x="6"
              y="24.4"
              width="13"
              height="4"
            />
            <rect
              className="fig-soft-fill"
              x="42"
              y="11"
              width="14"
              height="17.4"
            />
            <rect
              className="fig-soft-fill"
              x="6"
              y="31"
              width="15"
              height="5"
            />
            <rect
              className="fig-soft-fill"
              x="23.5"
              y="31"
              width="15"
              height="5"
            />
            <rect
              className="fig-soft-fill"
              x="41"
              y="31"
              width="15"
              height="5"
            />
          </g>

          {/* Records cabinet: leads, projects, tasks */}
          <Solid paths={cab} tone="hi" />
          <g transform={cabFace}>
            {[0, 14, 28].map((v, i) => (
              <g key={`drawer-${v}`}>
                {i > 0 ? <Line d={`M0 ${v}L48 ${v}`} tone="mid" /> : null}
                <rect
                  className="fig-ink"
                  x="19"
                  y={v + 6}
                  width="10"
                  height="1.6"
                />
                <FaceText
                  transform={`translate(4 ${v + 11.6})`}
                  size={2.6}
                  tone="mid"
                >
                  {["LEADS", "PROJECTS", "TASKS"][i]}
                </FaceText>
              </g>
            ))}
          </g>
          <Solid paths={cabCap} tone="hi" />
          <Solid paths={card} tone="hi" className="fig-accent" />
          <Solid paths={lamp} tone="hi" className="fig-gold" />
        </IsoFigure>
      </Plate>
    </div>
  );
}
