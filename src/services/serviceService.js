/**
 * SERVICE (RO service offerings) SERVICE
 * Swap the bodies for API calls when the backend is available.
 */

import services, { serviceProcess, trustPoints } from "../data/services";
import { delay } from "../utils/helpers";

export async function getServices() {
  await delay(120);
  return services
    .filter((service) => service.active)
    .sort((a, b) => a.order - b.order);
}

export async function getServiceProcess() {
  await delay(0);
  return serviceProcess;
}

export function getTrustPoints() {
  return trustPoints;
}
