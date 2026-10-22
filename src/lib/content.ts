export interface ContentPage {
  slug: string;
  title: string;
  summary: string;
  body: string;
}
export const services = [
  {
    id: "google-business-profile",
    title: "Google Business Profile",
    summary:
      "Help nearby customers find accurate details about your business on Google Maps and Search.",
    icon: "MapPin",
  },
  {
    id: "websites",
    title: "Business websites",
    summary:
      "A clear, fast website that explains what you do and helps visitors take the next step.",
    icon: "PanelsTopLeft",
  },
  {
    id: "automation",
    title: "Workflow automation",
    summary:
      "Automatic follow-ups for enquiries and everyday tasks, built with n8n, so nothing is retyped or missed.",
    icon: "Workflow",
  },
  {
    id: "local-seo",
    title: "Local search support",
    summary:
      "Improve the information and structure that help customers understand your local business.",
    icon: "Search",
  },
  {
    id: "booking",
    title: "Booking and appointment journeys",
    summary:
      "Help customers request the right appointment without confusion about what is confirmed.",
    icon: "CalendarCheck",
  },
  {
    id: "social-media",
    title: "Social media support",
    summary:
      "Keep the business information, content and enquiry handoffs on your social channels organised.",
    icon: "MessageCircle",
  },
  {
    id: "messaging",
    title: "WhatsApp and message workflows",
    summary:
      "Route enquiries and agreed follow-ups with clear permissions and sensible limits.",
    icon: "MessagesSquare",
  },
  {
    id: "reporting",
    title: "Practical business reporting",
    summary:
      "Bring agreed enquiry and project information into a report your team can use.",
    icon: "ChartNoAxesCombined",
  },
] as const;
export const industries = [
  {
    slug: "clinics",
    title: "Websites and enquiry systems for clinics",
    summary:
      "Clear service information and appointment enquiries that respect patient privacy.",
    image: "clinic.jpg",
  },
  {
    slug: "hospitality",
    title: "A useful online home for hospitality businesses",
    summary:
      "Make menus, opening hours, directions and booking information easy to find.",
    image: "local-cafe.jpg",
  },
  {
    slug: "coaching",
    title: "Clear websites for coaching and learning centres",
    summary:
      "Help learners and families understand courses, schedules and the next step.",
    image: "learning.jpg",
  },
  {
    slug: "local-services",
    title: "A clear digital presence for local services",
    summary:
      "Explain your work, service area and enquiry process without making customers guess.",
    image: "local-cafe.jpg",
  },
] as const;
export const pages: ContentPage[] = [
  {
    slug: "services/google-business-profile",
    title: "Google Business Profile",
    summary:
      "Help nearby customers find accurate details about your business on Google Maps and Search.",
    body: "## Make the basics easy to find\nA person looking for your business should not have to guess whether you are open, where you work or how to contact you. We help eligible local businesses set up, claim and improve their Google Business Profile.\n\nThe first step is an ownership and eligibility check. If a profile already exists, creating another one may cause more problems than it solves. We review the existing listing, identify the right next step and explain what information you need to provide.\n\n## What the work can include\n- Review of your business name, primary category and contact details.\n- Support with claiming or creating an eligible profile.\n- Help presenting services, business hours, service areas and photographs.\n- A practical checklist for keeping information current.\n- A review-request process that does not buy, gate or invent customer reviews.\n\nGoogle controls verification, eligibility and search results. We can help you follow the process, but we cannot verify a business on Google's behalf or guarantee a ranking.\n\n## What we need from you\nYou will need to confirm the details of your business and supply photographs you have permission to use. Keep ownership in an account controlled by your business. Where access is needed, we agree the role and remove access when the work ends.\n\n## What a good handover looks like\nYou should know which account owns the profile, what changed and who is responsible for future updates. We document unresolved verification steps instead of presenting them as completed work.\n\nGoogle Business Profile itself is free. Any agreed Techcyme fee covers our services, not a payment to Google for a listing. Read [Google's eligibility guidance](https://support.google.com/business/answer/3038177) before setting up a profile.\n\n## Start with a profile review\nSend your business name, location and existing profile link if you have one. We will use that information to scope the work, not promise a position in search results.",
  },
  {
    slug: "services/websites",
    title: "Business websites",
    summary:
      "A clear, fast website that explains what you do and helps visitors take the next step.",
    body: "## A website with a clear job\nA useful business website answers a few questions quickly. What do you offer? Is it suitable for this visitor? Where do you operate? What should they do next?\n\nWe plan the pages around those questions. A clinic may need service information and an appointment request. A coaching institute may need courses, schedules and an enquiry form. A hospitality business may need menus, directions and booking information.\n\n## Scope the experience before the pages\nWe agree the main visitor journeys, content responsibilities and integrations before implementation. The scope should name the pages, forms and devices to test. It should also make clear what is not included.\n\nWork can include:\n- A responsive layout with readable type and usable navigation.\n- Service pages, business information and contact journeys.\n- Form validation and a server-side destination for enquiries.\n- Page titles, descriptions, canonical URLs and a sitemap.\n- Image optimisation and practical accessibility checks.\n- A handover that covers content updates and account ownership.\n\n## No pretend functionality\nAn enquiry form should confirm success only after the server accepts the enquiry. A booking interface should not imply a reserved appointment unless it connects to an actual scheduling system. Payments need a real provider, verified account details and an agreed refund process.\n\n## Content and ownership\nYou supply or approve business facts, prices, photographs and policy details. We do not fill a new site with invented reviews, awards or client logos. Domain, hosting and provider accounts should have clear owners and recovery details.\n\n## Launch and ongoing work\nA launch checklist covers the agreed pages, mobile layouts, broken links, form errors and the deployment environment. Ongoing changes, backups, hosting and monitoring need named responsibilities. Those arrangements are agreed separately rather than assumed to be included forever.\n\nTell us what the website needs to do and what you already have. We can then agree a practical starting point.",
  },
  {
    slug: "services/automation",
    title: "Workflow automation",
    summary:
      "Automatic follow-ups for enquiries and everyday tasks, built with n8n, so nothing is retyped or missed.",
    body: "## Start with one repeated task\nAutomation is useful when the process is understood. Before connecting tools, we ask what starts the work, what information it needs, where the result belongs and who should handle an exception.\n\nA first workflow might take a website enquiry, check required fields, create a lead record and notify the right person. Another might prepare a follow-up task after a project status changes. The goal is a reliable handoff, not a workflow that runs without anyone knowing what happened.\n\n## What we scope\n- The trigger, inputs and expected output.\n- Supported integrations and required subscriptions.\n- Access permissions and where credentials are stored.\n- Duplicate handling, retries and failure notifications.\n- Test cases using suitable sample data.\n- Documentation, ownership and ongoing monitoring.\n\n## Built around your tools\nn8n is a workflow platform, not a guarantee that every application can be connected in the same way. Some integrations need an API plan. Others need a webhook, a provider approval or a change to the process. We check those dependencies before agreeing the implementation.\n\n## Customer data needs care\nOnly collect the information the workflow needs. Agree who can access it, how long it is kept and what happens when a customer asks for a correction or deletion. An automated message still needs an appropriate purpose and any consent required for the channel.\n\n## Keep a person in the loop\nWe do not recommend unattended decisions about medical advice, payment disputes or other sensitive matters. A workflow should make the next responsible action easier to see. Errors should reach an owner, and the workflow should have a way to pause safely.\n\n## Handover and support\nThe handover includes a process map, configuration notes and instructions for checking a failed run. Hosting, provider costs and ongoing monitoring are agreed separately. Read the [n8n documentation](https://docs.n8n.io/) for platform details.\n\nDescribe one task you repeat each week. That is a more useful starting point than a list of tools you feel you ought to connect.",
  },
  {
    slug: "services/local-seo",
    title: "Local search support",
    summary:
      "Improve the information and structure that help customers understand your local business.",
    body: "## Make your local information consistent\nLocal search work starts with useful, accurate information. A visitor should see the same business name, location, contact details and service information across the places you control.\n\nWe review the website and business profile together. If the address is wrong, the services are unclear or the mobile contact journey does not work, adding more pages is not the first fix.\n\n## A practical review\nThe scope can cover page titles, headings, internal links, indexing instructions, service information and contact details. We look for duplicate pages, broken links and content that exists for a search term but does not help a visitor.\n\nWe can also review structured data. It should describe the actual business and visible page content. We do not add fake ratings, an address that is not yours or services you do not provide.\n\n## Useful pages, not repeated pages\nA service page should explain the work, the audience and the next step. A location page is useful when there is meaningful information about serving that area. Replacing a town name in the same paragraph across dozens of pages is not a content strategy.\n\n## Measure the right thing\nSearch impressions and clicks can help identify changes over time, but they do not by themselves show how many suitable customers contacted you. Where appropriate, we agree which enquiries or actions should be measured and which tools you authorise.\n\n## What we do not promise\nNo one can guarantee a position in organic search or a volume of traffic. Search engines decide what to index and display. We do not sell links, create fake reviews or promise a fixed number of days to reach the first page.\n\n[Google's SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) explains the foundations. Our work is to apply suitable practices to your actual website and keep the scope understandable.",
  },
  {
    slug: "services/booking",
    title: "Booking and appointment journeys",
    summary:
      "Help customers request the right appointment without confusion about what is confirmed.",
    body: "## A booking journey should set the right expectation\nAn appointment request is not the same as a confirmed booking. The website needs to explain which one a customer is making and what happens next.\n\nWe help businesses choose a suitable journey, from a simple request form to an integration with an existing scheduling provider. The decision depends on how availability is managed, who confirms appointments and what information needs to be collected.\n\n## Work we can scope\n- A clear service or appointment selection.\n- A mobile-friendly request or booking interface.\n- Connection to a supported scheduling system.\n- Confirmation and cancellation information.\n- Team notifications and agreed reminders.\n- Error states for unavailable times or failed requests.\n\n## Avoid unnecessary personal information\nA clinic enquiry form should not ask for detailed medical records when a name and contact method are enough to arrange a conversation. A coaching enquiry should not collect identity documents before there is a reason to do so.\n\nWe agree the fields, purpose and destination with you. Provider terms, retention and access permissions need review before the integration goes live.\n\n## Test the less convenient cases\nThe work should cover duplicate submissions, time zones, a full calendar, provider downtime and a customer who needs to change their appointment. If the booking cannot be completed, the interface should say so and offer a practical next step.\n\n## Provider and operating costs\nScheduling tools may charge by user, location or appointment volume. Messaging and payment features may have separate fees. Those costs and account ownership should be clear before implementation.\n\nTell us how your team manages availability today. We can then suggest an interface that matches the process rather than adding a calendar your team cannot maintain.",
  },
  {
    slug: "services/social-media",
    title: "Social media support",
    summary:
      "Keep the business information, content and enquiry handoffs on your social channels organised.",
    body: "## Give your channels a clear role\nA social profile can help someone understand your business before visiting or making contact. It should show accurate information and content that is relevant to the people you serve.\n\nWe help plan a manageable publishing approach around your services, available material and team capacity. We do not promise a follower count or use purchased engagement to make a profile look established.\n\n## Define the work\nA scope can include profile information, a content calendar, copy and design support, publishing arrangements and an enquiry handoff. The number of platforms, posts, review rounds and supported formats should be agreed in writing.\n\nIf you need paid advertising, that requires a separate scope covering the account, budget, approval process and reporting. Advertising spend is not assumed to be included in content work.\n\n## Use material you have permission to publish\nCustomer photographs, testimonials and staff images need appropriate permission. Product and service claims should be checked by your business. Regulated services may have additional advertising requirements that need specialist review.\n\n## Decide who replies\nMessages and comments can contain complaints, booking requests or personal information. Agree who monitors each channel, which issues are escalated and when a reply can reasonably be expected. We do not advertise round-the-clock support unless that arrangement exists.\n\n## Reporting without inflated claims\nA report should explain the period, the source and what the figures mean. Reach, engagement and enquiries are different measures. The useful question is whether the channel is supporting the role you agreed for it.\n\nSend the profiles you use and the type of work you can supply regularly. We can help define a schedule that your business can sustain.",
  },
  {
    slug: "services/messaging",
    title: "WhatsApp and message workflows",
    summary:
      "Route enquiries and agreed follow-ups with clear permissions and sensible limits.",
    body: "## Make the handoff easier\nWhen a customer sends a message, someone needs to know what to do next. A messaging workflow can organise that handoff, send an authorised acknowledgement or create a follow-up task.\n\nWe first review the channel and provider. A personal messaging account, a business application and a supported business API have different capabilities and rules. We do not assume that a personal account can be turned into an unrestricted messaging service.\n\n## Agree the purpose\nA scope should name the messages to send, their triggers, recipients and stop conditions. It should also explain how customers opt out where that is required and who handles replies that need a person.\n\nPotential work includes enquiry routing, template preparation, supported provider integrations and team notifications. Provider approval, template review and third-party fees are outside our control.\n\n## No scraped contact lists\nWe do not recommend sending bulk messages to people who have not agreed to receive them. A customer asking about an appointment has not automatically agreed to every future promotion.\n\nCollect only necessary contact details and record the relevant permissions. Make suppression and deletion requests part of the process rather than an afterthought.\n\n## Check the failure path\nMessages can fail because of provider rules, invalid numbers, limits or network problems. A workflow should record what happened and direct unresolved work to an owner. It should not mark a customer as contacted simply because a send request was attempted.\n\nDescribe the conversation you need to support and the tools you already use. We will check the provider requirements before proposing the integration.",
  },
  {
    slug: "services/reporting",
    title: "Practical business reporting",
    summary:
      "Bring agreed enquiry and project information into a report your team can use.",
    body: "## A report should help someone decide what to do\nMore numbers do not automatically mean a better report. We start with the questions your team needs to answer: where enquiries came from, which ones need follow-up, what work is due and where a project is waiting for a decision.\n\nThe scope can cover a shared enquiry view, project status reporting or a connection between supported tools. We use the information your business has permission to process.\n\n## Define the measures\nEvery measure needs a source and a definition. A website form submission is not necessarily a new client. A completed task is not necessarily a completed project. We agree the meaning before putting a number on a dashboard.\n\nUseful work may include consistent status fields, clear dates, source labels and a review of missing data. Sometimes the most valuable first report is a short list of enquiries that no one has answered.\n\n## Access and sharing\nCustomer details should be visible only to people who need them. Public pages should not expose CRM records. Exports need care because downloaded files are no longer protected by the application's sign-in controls.\n\n## Keep the report maintainable\nAutomated reports still depend on the source data and working integrations. We document refresh behaviour, failure notifications and who is responsible for corrections. A dashboard should show an error or missing-data state rather than inventing a zero.\n\n## What we do not infer\nWe do not present traffic as revenue, estimate customer lifetime value without an agreed basis or attribute every sale to a single channel without evidence. Reports should make uncertainty visible.\n\nTell us which decision you want to make and where the information lives. We can then scope a report around that need.",
  },
  {
    slug: "about",
    title: "A practical digital partner for local businesses",
    summary:
      "Techcyme helps local businesses improve their online presence, website enquiries and everyday workflows.",
    body: "## Why this work matters\nA business can do good work and still be difficult to find online. Its opening hours may be wrong, the website may leave important questions unanswered, or enquiries may get lost between a form and a busy inbox.\n\nTechcyme focuses on those practical gaps. Our work covers Google Business Profile support, business websites and connected workflows. Supporting services are scoped around what the business actually needs.\n\n## How we approach a project\nWe begin with the customer journey and the current process. We ask what is already working, what information is missing and which tasks consume time. Then we agree a scope with named deliverables and dependencies.\n\nWe do not use unverified client counts, fabricated testimonials or guaranteed search rankings to sell the work. If a result depends on a provider's verification, an advertising budget or your team's approval, that dependency belongs in the conversation.\n\n## Clear ownership\nYou should know who owns your domain, profile, website and third-party accounts. Access should be agreed, limited to the work and removable when the engagement ends.\n\nA useful handover includes what changed, how to make routine updates and who handles ongoing maintenance. Support arrangements and provider costs should be explicit.\n\n## Before we work together\nWe will need accurate business information, suitable material and a person who can approve the work. We will explain the proposed scope before you commit. A contact form enquiry is a request for a conversation, not an order or a payment obligation.\n\nIf you want to discuss your business, [send an enquiry](/contact). Tell us what you do and where the current process is getting in the way.",
  },
  {
    slug: "pricing",
    title: "How our pricing works",
    summary:
      "One fixed price per project, agreed in a written scope. Pay 50% when you approve the scope and 50% on delivery.",
    body: "## Pay for an agreed scope\nThere is no one price that fits every business. A new business profile, a multi-page website and a workflow connecting several systems involve different work and dependencies.\n\nWe provide a written scope and quote before work starts. The quote should state the deliverables, responsibilities, review rounds, timetable assumptions and payment schedule. An enquiry does not authorise paid work.\n\n## Local visibility work\nA profile review or setup engagement can cover eligibility, ownership, business details and a handover. Google Business Profile itself is free. Our fee, where agreed, is for the work we provide.\n\nVerification is controlled by Google. A quote should not present verification or a search position as a guaranteed outcome.\n\n## Website projects\nWebsite scope depends on page count, content readiness and integrations. A business information site is different from a booking system or a project with payments.\n\nAsk what the quote includes for domain registration, hosting, maintenance, content changes and third-party tools. Those costs should not appear as surprises after launch.\n\n## Workflow projects\nAutomation scope depends on the process, supported integrations, provider plans and error handling. A working prototype is not the same as an unattended process with ongoing monitoring.\n\nThe quote should explain who owns the workflow, where it runs and what support is included after handover.\n\n## Changes and ongoing support\nIf the scope changes, we agree the effect on cost and timing before proceeding. Ongoing support is a separate arrangement unless included in the written scope.\n\n[Describe your project](/contact) and the tools you already use. We can then identify a sensible starting point without selling you a package you do not need.",
  },
  {
    slug: "privacy",
    title: "Privacy notice",
    summary:
      "How Techcyme collects, uses and protects personal data, and the rights you have under Indian law.",
    body: "This notice explains how Techcyme collects and uses personal data through this website and when we work with you. It is written to follow India's Digital Personal Data Protection Act, 2023.\n\n## Who we are\nTechcyme provides Google Business Profile support, business websites and workflow automation for local businesses in India. For this website, Techcyme decides why and how your personal data is used.\n\nContact for privacy questions: [contact@techcyme.com](mailto:contact@techcyme.com).\n\n## What we collect\nWhen you send an enquiry we collect your name, business name, email address, optional phone number, the service you are interested in and your message. We also record that you agreed to be contacted about the enquiry.\n\nIf you become a client, we also keep the project scope, invoices, payment records and messages about the work.\n\nPlease do not send medical records, identity documents, card details or passwords through the website.\n\n## Why we use it\n- To read and reply to your enquiry.\n- To prepare a scope and quote you asked for.\n- To deliver and support work you have agreed to.\n- To keep accounting and tax records required by law.\n\nWe do not sell your data, and sending an enquiry does not add you to a marketing list.\n\n## Who can see it\nOnly authorised Techcyme team members can open enquiry and client records. Hosting, database and email providers process data on our behalf to run the service, under their own security and confidentiality terms. We share data with others only when the law requires it.\n\n## How long we keep it\n- Enquiries that do not become a project: up to 24 months after our last contact.\n- Client and project records: for as long as tax and accounting law requires.\n- You can ask us to delete an enquiry earlier.\n\n## Your rights\nYou can ask to see the personal data we hold about you, correct it, or have it erased where we are not required to keep it. You can withdraw consent to be contacted at any time. Email us and we will respond within 30 days.\n\nIf you are not satisfied with our reply, you can complain to the Data Protection Board of India.\n\n## Security\nEnquiries are stored in a protected database. The admin workspace requires a sign-in, records access changes in an audit log and keeps personal values out of system logs.\n\n## Cookies\nThe public website does not use advertising or analytics cookies. See the [cookie notice](/cookies) for the essential cookies used by the admin workspace.\n\n## Changes\nIf this notice changes, the updated version will be published on this page.\n",
  },
  {
    slug: "terms",
    title: "Terms of service",
    summary:
      "The terms for using this website and for services from Techcyme, including payment in two instalments.",
    body: "These terms apply when you use this website and when Techcyme provides services to you. By sending an enquiry or approving a scope, you agree to them.\n\n## Using the website\nThe information on this website is general service information. You may use the site for lawful purposes only. Do not attempt to access the admin workspace without permission or interfere with the service.\n\n## Enquiries and quotes\nSending an enquiry does not create a contract or any obligation to pay. After a short review we send a written scope with the deliverables, price and target dates. A quote is valid for 30 days.\n\n## Payment\n- 50% of the agreed price is due when you approve the scope. Work starts after this payment.\n- The remaining 50% is due on delivery of the agreed work.\n- Prices are in Indian rupees. Applicable taxes, if any, are shown on the quote.\n- Third-party costs such as domains, hosting, software plans and messaging charges are listed separately and paid to the provider.\n\n## Your responsibilities\nYou supply accurate business information, content and photos you have the right to use, and timely feedback. You give us the account access needed for the work. Delays in content or access can move the delivery date.\n\n## Changes to the scope\nWork outside the written scope is agreed in writing, with its effect on price and timing, before it starts.\n\n## Ownership\nOnce the full price is paid, you own the deliverables made for you, such as website content and design files. Your domain, Google Business Profile and other accounts stay in your business name throughout. Third-party tools remain subject to their own licences.\n\n## After delivery\nWe fix defects in the agreed work that you report within 14 days of delivery at no charge. Ongoing maintenance, content updates and support after that are a separate arrangement.\n\n## What we do not promise\nGoogle, search engines and other platforms control verification, rankings and reach. We do not guarantee search positions, traffic, reviews or sales.\n\n## Liability\nOur total liability for any project is limited to the amount you paid for that project. We are not responsible for losses caused by third-party platforms or by information you supplied.\n\n## Cancellations and refunds\nSee the [cancellations and refunds policy](/refund-policy).\n\n## Governing law\nThese terms are governed by the laws of India.\n\n## Contact\nQuestions about these terms: [contact@techcyme.com](mailto:contact@techcyme.com).\n",
  },
  {
    slug: "cookies",
    title: "Cookie notice",
    summary:
      "The essential cookies and browser storage this website uses. No advertising or analytics.",
    body: "This notice explains the small amount of browser storage this website uses.\n\n## Essential cookies for the admin workspace\nWhen a Techcyme team member signs in to the admin workspace, a secure, HTTP-only session cookie keeps them signed in and protects the sign-in process. Visitors reading the public pages or sending an enquiry do not need this cookie.\n\n## Your theme preference\nIf you switch between light and dark mode, the choice is saved in your browser's local storage. It contains no personal information.\n\n## No advertising or analytics\nThe public website does not use advertising cookies, tracking pixels or third-party analytics. If this changes, we will update this notice and ask for your consent first.\n\n## Managing storage\nYou can clear cookies and local storage in your browser settings at any time. Clearing them signs team members out of the admin workspace and resets the theme.\n\n## Questions\nEmail [contact@techcyme.com](mailto:contact@techcyme.com).\n",
  },
  {
    slug: "privacy-security",
    title: "Security and responsible reporting",
    summary:
      "How to report a security issue on this website and how we protect it.",
    body: 'If you find a security issue on this website, please tell us so we can fix it.\n\n## How to report\nEmail [support@techcyme.com](mailto:support@techcyme.com) with the subject "Security report". Include the page address, what you found and the steps to see it. We acknowledge reports within 1 business day.\n\n## Please keep testing limited\n- Do not access, change or delete other people\'s data.\n- Do not send bulk requests or disrupt the service.\n- If you see personal information by accident, stop and tell us where, without copying it.\n\n## How we protect the site\n- The admin workspace requires an approved account and a secure sign-in.\n- Every change in the admin workspace is recorded in an audit log.\n- Forms are validated and rate limited, and requests from other websites are rejected.\n- Security headers and a content security policy are applied to every page.\n\nWe review every report and keep you updated until the issue is resolved.\n',
  },
  {
    slug: "accessibility",
    title: "Accessibility statement",
    summary:
      "How we make this website usable for everyone and how to report a barrier.",
    body: "We want everyone to be able to read this website and send an enquiry, whatever device or assistive technology they use.\n\n## What we do\n- Pages are tested against WCAG 2.1 level AA with automated checks on desktop and mobile.\n- Every page has clear headings, labelled form fields, visible focus states and a skip link.\n- The site works with a keyboard alone, and menus and dialogs manage focus correctly.\n- Colours meet contrast requirements in both light and dark mode.\n- Animations stop when your device asks for reduced motion.\n\n## Known limits\nAutomated tests do not catch every issue. If something is hard to use, we want to know.\n\n## Report a barrier\nEmail [support@techcyme.com](mailto:support@techcyme.com) with the page address and what went wrong. If you are comfortable, tell us your browser, device and any assistive technology. We reply within 1 business day.\n",
  },
  {
    slug: "refund-policy",
    title: "Cancellations and refunds",
    summary:
      "What happens if you cancel a project, when payments are refunded and how to ask.",
    body: "This policy explains what happens if you cancel a project or ask for a refund. Payments follow the two-instalment plan in our [terms](/terms).\n\n## Before work starts\nIf you cancel after paying the first instalment but before any work has started, we refund the first instalment in full.\n\n## After work has started\nIf you cancel during the project, we refund the first instalment minus the value of work already completed. We share a summary of the completed work with the refund.\n\n## After delivery\nThe second instalment is due on delivery. If something does not match the agreed scope, tell us within 14 days and we will fix it. Once the work is delivered and accepted, payments are not refundable.\n\n## Third-party costs\nAmounts paid to providers, such as domain registration, hosting, software plans or messaging charges, follow the provider's own refund rules and are not refunded by Techcyme.\n\n## How to request a cancellation or refund\nEmail [delivery@techcyme.com](mailto:delivery@techcyme.com) with your name, business name and project reference. Do not send card details or banking passwords.\n\nWe reply within 1 business day. Approved refunds are paid to the original payment method within 7 business days.\n\n## Questions\nIf you are unsure how this applies to your project, ask us before you approve the scope.\n",
  },
  {
    slug: "guides/google-business-profile-checklist",
    title: "Before you create a Google Business Profile",
    summary:
      "Check eligibility, ownership and business information before setting up a local business profile.",
    body: "## First, check whether the business is eligible\nA Google Business Profile is for businesses that meet Google's requirements. Do not create a profile just because a business has a website. Review [Google's guidelines](https://support.google.com/business/answer/3038177) and pay particular attention to how and where the business serves customers.\n\nA service-area business and a shop that welcomes customers at a staffed location may need different settings. Do not use an address you are not entitled to represent. If you are unsure, resolve that question before uploading documents or requesting verification.\n\n## Look for an existing profile\nSearch the business name and location. A profile may already exist even if the current owner did not create it. Check whether someone in the business controls it and which account is involved.\n\nCreating a second profile can leave customers with conflicting information. It can also make ownership and verification harder to resolve. Record the existing profile URL and use the supported ownership process instead of treating duplication as a shortcut.\n\n## Prepare accurate details\nGather the real business name, the most suitable category, a working phone number, the website URL, regular opening hours and the area served. Confirm these details with the person responsible for the business.\n\nThe profile name should represent the business, not a list of search phrases. Hours should reflect when the business can actually serve customers. If appointments are required, make that clear in the relevant information.\n\n## Choose photographs you have permission to use\nUseful photographs help people recognise the business and understand the setting. Use current material and get appropriate permission for identifiable people. Do not publish confidential information or imply that stock images show your actual premises.\n\nKeep a simple folder with the approved files and the person who can authorise updates. This makes future changes easier than hunting through messages for the latest version.\n\n## Keep control of the account\nThe business should retain ownership. If an agency or freelancer needs access, agree the role and the work they will perform. Record how access will be removed after the engagement.\n\nDo not share passwords or verification codes in ordinary project notes. Use the platform's access controls and the appropriate verification process.\n\n## Plan verification without promising a date\nGoogle decides which verification methods are available and whether further checks are needed. Follow the process shown in the account. An outside provider cannot guarantee verification or bypass Google's requirements.\n\nMake a note of outstanding steps and who is responsible for each one. A setup project is not complete simply because a form was submitted.\n\n## Keep the information useful after setup\nSomeone needs to update holiday hours, changed services, photographs and contact details. Agree who will do it and when the profile should be reviewed.\n\nCustomer reviews should be genuine. Do not buy them, write them on a customer's behalf or request only positive feedback. A review-request process should be honest and consistent with platform rules.\n\n## Decide whether you need help\nIf eligibility and ownership are clear, you may be able to complete the process yourself. If the existing listing is confusing, collect the facts and get a scoped review. [Our profile support](/services/google-business-profile) explains the type of work we can help with. Google Business Profile itself is free; a service fee is for the agreed assistance.",
  },
  {
    slug: "guides/website-enquiry-checklist",
    title: "Check your website enquiry journey",
    summary:
      "A practical review of the route from a service page to a saved enquiry and a clear follow-up.",
    body: "## Start on a phone, not in the dashboard\nOpen your website on a phone and look for one service a customer might need. Can you tell what is offered, who it is for and where the business operates without opening several menus?\n\nThis is a content test as much as a layout test. A large headline does not help if the service information is vague. Use words a customer would use and put practical details near the point where they need them.\n\n## Make the next action clear\nDecide whether the page asks someone to call, request an appointment, send an enquiry or make a confirmed booking. These are different actions. A form that asks a team member to call back should not say an appointment has been reserved.\n\nUse a specific button label. Check that the same action behaves consistently across the site. A contact button should not sometimes open a form and sometimes send someone to an unrelated payment page.\n\n## Ask for enough information, not everything\nA first enquiry usually needs a name, a contact method and a useful description. Ask why each additional field is needed. Do not collect identity documents or detailed medical information just to arrange an initial conversation.\n\nExplain the purpose of the form and link to the privacy information. Marketing consent, if needed, should be separate from contact about the enquiry.\n\n## Test invalid input\nTry an empty form, an incomplete email address and an overlong message. The form should identify the problem without deleting all the text. Required fields should have labels, and the error should not rely on a red border alone.\n\nThen try a valid submission with the network unavailable. A success message before the server saves the enquiry gives the customer false confidence. The failed state should explain what happened and offer an alternative contact method.\n\n## Follow the information after submission\nConfirm that the enquiry reaches the system the team uses. If it is stored in a CRM, check that the intended person can find it. If an email is queued, distinguish queued from accepted by the provider. An email notification is useful, but it should not be the only copy of an important enquiry.\n\nRecord the next action and who owns it. A saved lead with no follow-up can be as unhelpful as a form that does not work.\n\n## Check duplicate handling\nPeople double-click buttons or retry when a response is slow. Use a disabled submitting state and a server-side idempotency key so the same request does not create repeated work. Do not rely on the button alone; requests can arrive without the visible form.\n\n## Review accessibility and privacy\nUse the keyboard to move through the fields and submit the form. Check focus, labels and status announcements. Automated accessibility tests can help, but they cannot answer every question about usability.\n\nFinally, review who can access the records, when they are deleted and whether exports or backups create extra copies. A complete enquiry journey includes the handling after the customer closes the tab.\n\n[Our website work](/services/websites) starts with these journeys rather than a page count alone.",
  },
  {
    slug: "guides/automation-first-workflow",
    title: "Choose your first business automation",
    summary:
      "How to scope one repeatable task before connecting tools or giving a workflow access to customer data.",
    body: "## Pick a repeated handoff\nA useful first automation is often a task you can describe without naming software. For example: when an enquiry is accepted, put it in the lead list and create a follow-up task for the person who reviews it.\n\nIf the process is still changing every day, write down the current version first. Connecting tools before agreeing the process can make a confusing task run faster without making it better.\n\n## Define the trigger\nBe specific about what starts the work. Is it an accepted form submission, a paid invoice, a project status change or a scheduled review? A button click in a browser is not proof that the server saved the record.\n\nWrite down the event and the system that is authoritative. This helps avoid duplicate triggers when more than one tool can report the same activity.\n\n## List the required information\nFor each step, identify the fields it needs. A team notification may need a record link and a short summary rather than the entire message. A task may need a due date and an owner. Avoid copying every available field simply because the connector supports it.\n\nCheck that the business has an appropriate reason to process the information and permission to use the destination. Customer data should not be sent to a new provider without review.\n\n## Define a successful result\nA workflow run is not successful just because it started. Decide what needs to exist at the end and how that will be checked. For an enquiry, the result might be a stored lead, a follow-up task and a recorded notification status.\n\nDo not mark a message as delivered when an API merely accepted a send request. Provider acceptance, delivery and a customer reading a message can be different events.\n\n## Handle the repeated event\nSystems retry requests. People resubmit forms. A webhook may arrive more than once. Choose a stable event or request identifier and use it to prevent duplicate records or messages.\n\nAlso decide what should happen if one step succeeds and the next fails. A retry should not recreate completed work unnecessarily.\n\n## Plan the failure path\nChoose an owner for failed runs and a place where they can see the problem. Use a limited retry policy for temporary errors. Stop and ask for review when the problem involves missing permission, invalid business data or a provider decision.\n\nA workflow that silently retries forever is not unattended reliability. It is an accumulating backlog.\n\n## Keep credentials out of the workflow notes\nUse the platform's credential storage and grant only the access needed. Do not paste API keys into source control, screenshots or task descriptions. Document which account owns the connection and how access can be revoked.\n\n## Test with suitable sample data\nCover a valid request, missing fields, duplicate events, an unavailable provider and an unauthorised action. Confirm the records after the run, not just the green status in the workflow editor.\n\n## Agree how it will be operated\nA production workflow needs hosting, monitoring, backups where relevant and someone responsible for changes. Provider plans and limits can change. Include a way to pause the workflow and a short handover for checking failures.\n\n[n8n workflow support](/services/automation) can help turn one well-defined process into an integration. Start with the task, then choose the tools that fit it.",
  },
  {
    slug: "industries/clinics",
    title: "Websites and enquiry systems for clinics",
    summary:
      "Clear service information and appointment enquiries that respect patient privacy.",
    body: "## Help people understand the practice\nA clinic website needs clear information before it needs elaborate effects. Visitors want to know the services offered, where the practice is located, how appointments work and which contact method to use.\n\nWe structure the website around those questions. Clinical claims, practitioner details and regulated information need approval from your business and, where appropriate, a qualified reviewer.\n\n## Separate enquiries from clinical information\nAn initial appointment request should collect only what is needed to arrange contact. It should not encourage people to submit medical histories, test results or urgent symptoms into a general website form.\n\nThe site should explain whether a request is pending or confirmed. If it is not an emergency service, that needs to be clear. We do not provide medical triage or automated treatment advice.\n\n## Keep practical details current\nOpening hours, location, accessibility information and appointment instructions can affect a visit. Assign someone to approve those details and update them when they change.\n\nGoogle Business Profile support can be scoped separately, subject to eligibility and verification. Account ownership should remain with the practice.\n\n## Make the team handoff clear\nAn enquiry can create a lead or follow-up task for an authorised team member. Sensitive data and clinical systems require a separate privacy and security review. A general CRM is not presented as an electronic health-record system.\n\nWe can help with the [website](/services/websites), [profile information](/services/google-business-profile) and [appointment journey](/services/booking). The starting point is an agreed process, not an unsupported claim about patient growth.",
  },
  {
    slug: "industries/hospitality",
    title: "A useful online home for hospitality businesses",
    summary:
      "Make menus, opening hours, directions and booking information easy to find.",
    body: "## Give people the details they need to visit\nFor a cafe, restaurant or stay, a good first impression should lead to useful information. People need to know where you are, when you are open and what they can expect.\n\nPhotography helps set the tone, but it should show the real business or be clearly identified as illustrative. Menus, room details and booking information should be readable on a phone without forcing a customer to zoom into an image.\n\n## Keep the route to booking honest\nA booking enquiry and a confirmed reservation need different wording. If availability is managed in another system, we review the integration and its limits before suggesting a calendar or reservation form.\n\nPrices, cancellation rules and provider fees need your approval. The website should not invent availability or imply that a payment has been taken when no provider is connected.\n\n## Local information matters\nBusiness profile details, opening hours and directions should agree with the website. Seasonal hours and closures need an owner who can update them. We can help organise the information and hand over a practical maintenance process.\n\n## Reduce repeated enquiries\nA useful page can answer recurring questions about opening times, location, menus or the booking process. Where a workflow is appropriate, it can route an enquiry to the right team member and create a follow-up task.\n\nWe do not assume that every hospitality business needs a large booking platform. Start with the customer journey and the tools your team can maintain. See our [website](/services/websites), [booking](/services/booking) and [workflow](/services/automation) services for scope options.",
  },
  {
    slug: "industries/coaching",
    title: "Clear websites for coaching and learning centres",
    summary:
      "Help learners and families understand courses, schedules and the next step.",
    body: "## Make the course information understandable\nA learner should be able to compare the courses you actually offer, understand the format and find a suitable contact route. A long page of broad claims is less helpful than clear details about the course, schedule and enquiry process.\n\nYou approve the academic information, fees, instructor details and any outcome claims. We do not invent admission results, placement rates or student testimonials to fill a design.\n\n## Organise the enquiry\nA website form can collect a name, contact method, course interest and a short question. For learners who are minors, the appropriate contact and consent process needs review by the business.\n\nDo not collect unnecessary identity documents through a general enquiry form. Keep enquiry access limited to the people responsible for follow-up.\n\n## Give the team a workable process\nAn accepted enquiry can become a lead and an internal task. Clear statuses help distinguish a new enquiry from a contacted learner or an enrolled client. Sending a form is not a confirmed enrolment or a payment.\n\nWhere you use an existing course or scheduling platform, we review the supported connection before proposing an integration.\n\n## Maintain the details\nCourse dates, application periods and contact information need updates. We can provide a manageable content process and document who approves changes.\n\nA useful starting point may be the [website journey](/services/websites), [local profile](/services/google-business-profile) or [enquiry workflow](/services/automation). We scope the work around your actual courses and team capacity.",
  },
  {
    slug: "industries/local-services",
    title: "A clear digital presence for local services",
    summary:
      "Explain your work, service area and enquiry process without making customers guess.",
    body: "## Be clear about what you do and where\nA customer looking for a local service needs to know whether you do the work they need and whether you serve their area. Put that information where it is easy to find, with a clear contact route.\n\nWe help organise service pages, business profile information and enquiry forms around those questions. We do not add locations you do not serve or create repeated pages solely to target town names.\n\n## Set the expectation before the enquiry\nExplain whether the next step is a call, an estimate request or an appointment. If a price depends on a site visit or a review, say so instead of displaying an unsupported fixed price.\n\nPhotographs and examples should be yours to use. Any customer review or project result needs permission and a factual basis.\n\n## Keep the work organised\nAn enquiry can create a lead and a follow-up task. A qualified lead can be converted into a client and project in the CRM. The team still needs to decide whether the work is suitable and agree the scope with the customer.\n\nAutomation can reduce repeated entry, but it should not commit your business to a price, booking or response time that no one approved.\n\n## Start with the gap that matters\nIf people cannot find the business, review the [local profile](/services/google-business-profile). If they arrive but do not understand the offer, review the [website](/services/websites). If enquiries get lost, start with the [workflow](/services/automation).\n\nYou do not need to buy every service at once. A defined piece of work with a clear owner is a more useful first step.",
  },
];
export const legalSlugs = [
  "privacy",
  "terms",
  "cookies",
  "accessibility",
  "refund-policy",
  "privacy-security",
];
