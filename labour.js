function calculateLabour(inputs) {

  const totalHeads =
    inputs.newHeads + inputs.relocateHeads;

  const labourHours =
    totalHeads * inputs.hoursPerHead;

  const labourCost =
    labourHours * inputs.labourRate;

  return {
    totalHeads,
    labourHours,
    labourCost
  };

}
