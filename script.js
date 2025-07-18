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
      <label>Select Model(s) for ${company}:</label>
      <div id="modelsCheckboxes_${company}">
        ${models.map(model => `
          <label>
            <input type="checkbox" name="model_${company}" value="${model}"> ${model}
          </label>
        `).join("")}
      </div>
      <div id="experienceInputs_${company}"></div>
    `;

    modelSections.appendChild(section);

    // Add event listeners to each model checkbox
    models.forEach(model => {
      const checkbox = section.querySelector(`input[value="${model}"]`);
      checkbox.addEventListener("change", () => {
        const experienceInputsDiv = section.querySelector(`#experienceInputs_${company}`);
        const inputId = `experience_${company}_${model}`;
        const wrapperId = `wrapper_${company}_${model}`;

        if (checkbox.checked) {
          const inputField = document.createElement("div");
          inputField.id = wrapperId;
          inputField.innerHTML = `
            <label for="${inputId}">Years of Experience with ${model}:</label>
            <input type="number" id="${inputId}" name="${inputId}" min="0" placeholder="e.g. 2" />
          `;
          experienceInputsDiv.appendChild(inputField);
        } else {
          const toRemove = document.getElementById(wrapperId);
          if (toRemove) toRemove.remove();
        }
      });
    });
  });
});

// Handle form submission
document.getElementById("carForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const selectedCompanies = Array.from(document.querySelectorAll("input[name='company']:checked"))
    .map(cb => cb.value);

  const formData = [];

  selectedCompanies.forEach(company => {
    const selectedModels = Array.from(document.querySelectorAll(`input[name='model_${company}']:checked`))
      .map(cb => cb.value);

    const modelExperience = selectedModels.map(model => {
      const experience = document.getElementById(`experience_${company}_${model}`).value;
      return {
        model,
        experience
      };
    });

    formData.push({
      company,
      models: modelExperience
    });
  });

  // Save to localStorage and redirect
  localStorage.setItem("carFormData", JSON.stringify(formData));
  window.location.href = "result.html";
});
