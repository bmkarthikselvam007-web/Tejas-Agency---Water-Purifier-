/**
 * SERVICE OFFERINGS
 * ---------------------------------------------------------------------------
 * Only the services listed here are described anywhere in the UI. If the
 * agency does not offer one of these, remove it from this file and it will
 * disappear from every page.
 * ---------------------------------------------------------------------------
 */

export const services = [
  {
    id: "ro-repair",
    name: "RO Repair",
    icon: "wrench",
    shortDescription:
      "Diagnosis and repair when a purifier stops working, leaks or dispenses slowly.",
    details: [
      "Check the pump, motor and electrical connections",
      "Identify leaks in tubing and fittings",
      "Test the purification stages",
      "Advise on what needs repair or replacement",
    ],
    order: 1,
    active: true,
  },
  {
    id: "filter-replacement",
    name: "Filter Replacement",
    icon: "filter",
    shortDescription:
      "Replacement of pre-filters, sediment and carbon filters as per your usage and water quality.",
    details: [
      "Check the condition of each filter stage",
      "Replace filters that have reached the end of their life",
      "Flush the system after replacement",
      "Suggest a suitable replacement interval for your water",
    ],
    order: 2,
    active: true,
  },
  {
    id: "membrane-replacement",
    name: "Membrane Replacement",
    icon: "membrane",
    shortDescription:
      "RO membrane replacement when output drops or water quality changes.",
    details: [
      "Check output flow and water quality",
      "Confirm whether the membrane is the cause",
      "Replace the RO membrane",
      "Verify output after replacement",
    ],
    order: 3,
    active: true,
  },
  {
    id: "installation",
    name: "Installation",
    icon: "install",
    shortDescription:
      "Installation of new purifiers and water ionizers, including inlet, drain and mounting.",
    details: [
      "Check the installation point, inlet and drain",
      "Mount or place the unit securely",
      "Connect the water line and power supply",
      "Demonstrate how to operate and maintain the unit",
    ],
    order: 4,
    active: true,
  },
  {
    id: "maintenance",
    name: "Periodic Maintenance",
    icon: "calendar",
    shortDescription:
      "Routine checks that keep a purifier running properly between filter changes.",
    details: [
      "Inspect the unit and its connections",
      "Clean the storage tank where applicable",
      "Check purification stages and output",
      "Note anything that will need attention soon",
    ],
    order: 5,
    active: true,
  },
];

/** Steps shown on the RO service page. */
export const serviceProcess = [
  {
    step: 1,
    title: "Tell us the problem",
    description:
      "Send the product details and the issue on WhatsApp, or call us. Photos help us understand the problem faster.",
  },
  {
    step: 2,
    title: "We confirm the visit",
    description:
      "We confirm a convenient time and let you know what the visit is likely to cover.",
  },
  {
    step: 3,
    title: "On-site check",
    description:
      "The unit is inspected on site and we explain what needs to be repaired or replaced before any work is done.",
  },
  {
    step: 4,
    title: "Service completed",
    description:
      "After the work is done we test the output and explain what to watch for until the next service.",
  },
];

/** Trust points used on the homepage and about page. */
export const trustPoints = [
  {
    id: "presence",
    icon: "location",
    title: "Madurai presence",
    description:
      "A shop in Madurai you can visit, call or message - not a distant call centre.",
  },
  {
    id: "guidance",
    icon: "guide",
    title: "Product guidance",
    description:
      "We help you match a product to your water source, family size and budget.",
  },
  {
    id: "installation",
    icon: "install",
    title: "Installation support",
    description:
      "Installation is arranged and the unit is demonstrated before handover.",
  },
  {
    id: "service",
    icon: "wrench",
    title: "RO service support",
    description:
      "Repair, filter replacement and membrane replacement handled by our own team.",
  },
  {
    id: "choice",
    icon: "grid",
    title: "Multiple product choices",
    description:
      "RO purifiers and LifeCore alkaline water ionizers under one roof.",
  },
];

export default services;
