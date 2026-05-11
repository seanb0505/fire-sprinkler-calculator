function getInputs() {

  return {

    projectName:
      document.getElementById("projectName").value ||
      "Untitled Project",

    jobType:
      document.getElementById("jobType").value,

    newHeads:
      Number(
        document.getElementById("newHeads").value
      ) || 0,

    relocateHeads:
      Number(
        document.getElementById("relocateHeads").value
      ) || 0,

    dropPipeSize:
      document.getElementById("dropPipeSize").value,

    mechanicalTeeRequired:
      document.getElementById("mechanicalTeeRequired").value,

    hoursPerHead:
      Number(
        document.getElementById("hoursPerHead").value
      ) || 0,

    labourRate:
      Number(
        document.getElementById("labourRate").value
      ) || 0,

    wastePercent:
      Number(
        document.getElementById("wastePercent").value
      ) || 0,

    markupPercent:
      Number(
        document.getElementById("markupPercent").value
      ) || 0

  };

}

function runEstimate() {

  const inputs = getInputs();

  const materials =
    calculateMaterials(inputs);

  const labour =
    calculateLabour(inputs);

  const materialSubtotal =
    calculateMaterialSubtotal(materials);

  const wasteAmount =
    materialSubtotal *
    (inputs.wastePercent / 100);

  const materialWithWaste =
    materialSubtotal + wasteAmount;

  const directCost =
    materialWithWaste +
    labour.labourCost;

  const markupAmount =
    directCost *
    (inputs.markupPercent / 100);

  const totalEstimate =
    directCost + markupAmount;

  renderEstimate({
    inputs,
    materials,
    labour,
    materialSubtotal,
    wasteAmount,
    materialWithWaste,
    directCost,
    markupAmount,
    totalEstimate
  });

}

function renderEstimate(data) {

  const output =
    document.getElementById("estimateOutput");

  output.innerHTML = `

    <div class="result-grid">

      <div class="stat">
        <span>Total Heads</span>
        <strong>${data.labour.totalHeads}</strong>
      </div>

      <div class="stat">
        <span>Labour Hours</span>
        <strong>${data.labour.labourHours.toFixed(2)}</strong>
      </div>

      <div class="stat">
        <span>Material Cost</span>
        <strong>${formatMoney(data.materialWithWaste)}</strong>
      </div>

      <div class="stat">
        <span>Total Estimate</span>
        <strong>${formatMoney(data.totalEstimate)}</strong>
      </div>

    </div>

    <div class="card">

      <h3>${data.inputs.projectName}</h3>

      <p>
        <strong>Job Type:</strong>
        ${labelJobType(data.inputs.jobType)}
      </p>

      <p>
        <strong>Drop Pipe:</strong>
        ${data.inputs.dropPipeSize}"
      </p>

    </div>

    <h3>Material List</h3>

    <div class="table-wrapper">

      <table>

        <thead>
          <tr>
            <th>Material</th>
            <th>Qty</th>
            <th>Unit Cost</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>

          ${data.materials.map(item => `

            <tr>
              <td>${item.name}</td>
              <td>${item.quantity}</td>
              <td>${formatMoney(item.unitCost)}</td>
              <td>${formatMoney(item.total)}</td>
            </tr>

          `).join("")}

        </tbody>

      </table>

    </div>

    <h3>Estimate Summary</h3>

    <div class="table-wrapper">

      <table>

        <tbody>

          <tr>
            <td>Material Subtotal</td>
            <td>${formatMoney(data.materialSubtotal)}</td>
          </tr>

          <tr>
            <td>Waste</td>
            <td>${formatMoney(data.wasteAmount)}</td>
          </tr>

          <tr>
            <td>Material With Waste</td>
            <td>${formatMoney(data.materialWithWaste)}</td>
          </tr>

          <tr>
            <td>Labour</td>
            <td>${formatMoney(data.labour.labourCost)}</td>
          </tr>

          <tr>
            <td>Direct Cost</td>
            <td>${formatMoney(data.directCost)}</td>
          </tr>

          <tr>
            <td>Markup</td>
            <td>${formatMoney(data.markupAmount)}</td>
          </tr>

          <tr>
            <td><strong>Total Estimate</strong></td>
            <td><strong>${formatMoney(data.totalEstimate)}</strong></td>
          </tr>

        </tbody>

      </table>

    </div>

  `;

}

function clearEstimate() {

  document.getElementById("projectName").value = "";

  document.getElementById("jobType").value = "new";

  document.getElementById("newHeads").value = 0;

  document.getElementById("relocateHeads").value = 0;

  document.getElementById("dropPipeSize").value = "1";

  document.getElementById("mechanicalTeeRequired").value = "yes";

  document.getElementById("hoursPerHead").value = 1;

  document.getElementById("labourRate").value = 95;

  document.getElementById("wastePercent").value = 10;

  document.getElementById("markupPercent").value = 25;

  document.getElementById("estimateOutput").innerHTML = "";

}

function formatMoney(amount) {

  return new Intl.NumberFormat(
    "en-CA",
    {
      style: "currency",
      currency: "CAD"
    }
  ).format(amount);

}

function labelJobType(value) {

  const labels = {

    new: "New Drops",

    relocate: "Relocates",

    mixed: "Mixed Job",

    service: "Service Work"

  };

  return labels[value] || value;

}
