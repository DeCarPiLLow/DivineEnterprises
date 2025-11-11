import React from "react";
/**
 * Data model mirrors the extracted content from your images.
 * Each item has a title and an array of bullet points (technical particulars).
 */
const solarSpecs = [
  {
    id: 1,
    item: "Solar Panel (N-type Bifacial Topcon Panel Module)",
    particulars: [
      "Maximum efficiency = 22.8%",
      "Degradation = 0.4% Annual",
      "Up to 30% additional gain compared to P-type module",
      "Higher power generation",
      "Better output in low irradiance",
      "Performance warranty – 30 years",
      "Product warranty – 12 years",
      "Standard as per IEC",
    ],
  },
  {
    id: 2,
    item: "Grid Tie Solar Inverter",
    particulars: [
      "Latest MPPT type",
      "High efficiency – 97.6%",
      "Pure sine wave output",
      "Strong load handling capacity",
      "High reliability & performance",
    ],
  },
  {
    id: 3,
    item: "Structure (C-Section)",
    particulars: [
      "Pre-GI",
      "Hot Dip GI",
      "Legs: 140 x 50 mm; Rafter: 80 x 40 mm; Purlin: 41 x 41 mm",
      "CC Pillar: M-25 grade for 25 years durability",
      "Only M-10 SS nut-bolts used",
      "Double clamp fitment — End/Mid clamp & L-Hook",
      "Cross arm & tie arrangement",
      "Rafter is mounted with minimum of 02 nut-bolts",
      "Chemically anchored mounted structure",
    ],
  },
  {
    id: 4,
    item: "ACDB / DCDB",
    particulars: ["Reputed make is used."],
  },
  {
    id: 5,
    item: "Copper Wires",
    particulars: [
      "DC wires: 4 sq. mm, Type-2",
      "AC wires: Single core, multi-stranded wire, FR / FRLSH",
    ],
  },
  {
    id: 6,
    item: "Earthing",
    particulars: ["Copper rod chemical earthing — 03 Nos."],
  },
];

export default function MaterialSpec() {
  return (
    <div className="container mx-auto p-4 animate-fadeIn">
      <h1 className="text-2xl font-semibold text-emerald-600 mb-4">
        Material & Design — Technical Particulars
      </h1>

      <div className="overflow-x-auto rounded-xl shadow-md bg-white">
        <table className="min-w-full text-sm text-gray-800 border border-gray-200">
          <thead className="bg-emerald-500 text-white">
            <tr>
              <th className="py-3 px-4 text-left w-16">S.No</th>
              <th className="py-3 px-4 text-left w-1/4">Item</th>
              <th className="py-3 px-4 text-left">Technical Particulars & Workmanship</th>
            </tr>
          </thead>

          <tbody>
            {solarSpecs.map((row) => (
              <tr
                key={row.id}
                className="border-t border-gray-200 hover:bg-emerald-50 transition"
              >
                <td className="py-3 px-4 font-medium text-gray-600 text-center">
                  {row.id}
                </td>
                <td className="py-3 px-4 font-semibold">{row.item}</td>
                <td className="py-3 px-4">
                  <ul className="list-disc list-inside space-y-1">
                    {row.particulars.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-gray-500 text-xs mt-3 text-right">
        Generated on {new Date().toLocaleDateString()}
      </p>
    </div>
  );
}