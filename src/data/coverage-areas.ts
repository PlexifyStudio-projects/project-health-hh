import type { CoverageArea } from "@/types";

export const COVERAGE: CoverageArea[] = [
  {
    region: "Greater Los Angeles",
    cities: [
      "Los Angeles", "Glendale", "Pasadena", "Burbank", "Santa Monica",
      "Long Beach", "Torrance", "Inglewood", "Culver City", "Beverly Hills",
    ],
  },
  {
    region: "San Fernando Valley",
    cities: ["Sherman Oaks", "Encino", "Tarzana", "Northridge", "Van Nuys", "Granada Hills", "Woodland Hills"],
  },
  {
    region: "Orange County",
    cities: ["Anaheim", "Santa Ana", "Irvine", "Huntington Beach", "Garden Grove", "Fullerton"],
  },
  {
    region: "Ventura County",
    cities: ["Oxnard", "Thousand Oaks", "Simi Valley", "Camarillo", "Ventura"],
  },
  {
    region: "Inland Empire",
    cities: ["Riverside", "San Bernardino", "Ontario", "Rancho Cucamonga", "Corona"],
  },
];
