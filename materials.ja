const MATERIAL_PRICES = {
  sprinklerHead: 22,
  threaded90: 4.5,
  nipple1x2: 3.25,
  hanger: 5.5,
  rodAssembly: 3.75,
  mechanicalTee2x1: 18,
  mechanicalTeeLarge: 24,
  groovedCoupling2: 12,
  threadedPipe1: 4.5
};

function calculateMaterials(inputs) {

  const newHeads = inputs.newHeads;
  const relocateHeads = inputs.relocateHeads;

  const totalHeads = newHeads + relocateHeads;

  const materials = [];

  // HEADS

  addMaterial(
    materials,
    "Sprinkler Heads",
    totalHeads,
    MATERIAL_PRICES.sprinklerHead
  );

  // DROP MATERIAL

  addMaterial(
    materials,
    "Threaded 90s",
    totalHeads * 3,
    MATERIAL_PRICES.threaded90
  );

  addMaterial(
    materials,
    '1" x 2" Nipples',
    totalHeads,
    MATERIAL_PRICES.nipple1x2
  );

  addMaterial(
    materials,
    "Hangers",
    totalHeads,
    MATERIAL_PRICES.hanger
  );

  addMaterial(
    materials,
    "Rod Assemblies",
    totalHeads,
    MATERIAL_PRICES.rodAssembly
  );

  // MECHANICAL TEES

  if (
    newHeads > 0 &&
    inputs.mechanicalTeeRequired === "yes"
  ) {

    if (inputs.dropPipeSize === "1") {

      addMaterial(
        materials,
        '2" x 1" Mechanical Tees',
        newHeads,
        MATERIAL_PRICES.mechanicalTee2x1
      );

    } else {

      addMaterial(
        materials,
        `${inputs.dropPipeSize}" Mechanical Tees`,
        newHeads,
        MATERIAL_PRICES.mechanicalTeeLarge
      );

    }

  }

  // GROOVED COUPLINGS

  if (
    inputs.dropPipeSize !== "1" &&
    totalHeads > 0
  ) {

    addMaterial(
      materials,
      `${inputs.dropPipeSize}" Grooved Couplings`,
      totalHeads * 2,
      MATERIAL_PRICES.groovedCoupling2
    );

  }

  // PIPE

  addMaterial(
    materials,
    '1" Threaded Pipe Allowance',
    totalHeads,
    MATERIAL_PRICES.threadedPipe1
  );

  return materials;
}

function addMaterial(
  materials,
  name,
  quantity,
  unitCost
) {

  if (quantity <= 0) return;

  materials.push({
    name,
    quantity,
    unitCost,
    total: quantity * unitCost
  });

}

function calculateMaterialSubtotal(materials) {

  return materials.reduce(
    (sum, item) => sum + item.total,
    0
  );

}
