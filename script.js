function calculateEstimate() {
  const newHeads = Number(document.getElementById("newHeads").value) || 0;
  const relocateHeads = Number(document.getElementById("relocateHeads").value) || 0;
  const labourRate = Number(document.getElementById("labourRate").value) || 0;

  const hoursPerHead = 1;
  const totalHeads = newHeads + relocateHeads;
  const totalHours = totalHeads * hoursPerHead;
  const labourCost = totalHours * labourRate;

  document.getElementById("hours").textContent = totalHours;
  document.getElementById("cost").textContent = labourCost.toFixed(2);
}
