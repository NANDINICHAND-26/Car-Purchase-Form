const carData = {
  "Toyota": ["Corolla", "Camry", "Fortuner"],
  "Honda": ["Civic", "City", "CR-V"],
  "BMW": ["X1", "X5", "M4"],
  "Hyundai": ["i20", "Creta", "Verna"],
};

const companyOptions = document.getElementById("companyOptions");
const modelSections = document.getElementById("modelSections");

// Generate company checkboxes
Object.keys(carData).forEach(company => {
  const label = document.createElement("label");
  label.innerHTML = `<input type="checkbox" name="company" value="${company}"> ${company}`;
  companyOptions.appendChild(label);
});

// Update model sections when companies are selected
companyOptions.addEventListener("change", () => {
  modelSections.innerHTML = "";
  const selectedCompanies = Array.from(document.querySelectorAll("input[name='company']:checked"))
    .map(cb => cb.value);

  selectedCompanies.forEach(company => {
    const models = carData[company];
    const section = document.createElement("div");
    section.className = "model-group";
    section.innerHTML = `
      <label for="models_${company}">Select Model for ${company}:</label>
      <select id="models_${company}" name="models_${company}">
        ${models.map(model => `<option value="${model}">${model}</option>`).join("")}
      </select>
      <label for="experience_${company}">Years of Experience with this model:</label>
      <input type="number" id="experience_${company}" name="experience_${company}" min="0" placeholder="e.g. 2" />
    `;
    modelSections.appendChild(section);
  });
});

// Handle form submission
document.getElementById("carForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const selectedCompanies = Array.from(document.querySelectorAll("input[name='company']:checked"))
    .map(cb => cb.value);

  const formData = selectedCompanies.map(company => ({
    company,
    model: document.getElementById(`models_${company}`).value,
    experience: document.getElementById(`experience_${company}`).value
  }));

  // Store data in localStorage
  localStorage.setItem("carFormData", JSON.stringify(formData));

  // Redirect to result page
  window.location.href = "result.html";
});
