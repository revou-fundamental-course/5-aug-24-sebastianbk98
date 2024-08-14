// Declare all the element that needed
const form = document.getElementById("form");
const statusBMI = document.getElementById("status-bmi");
const info = document.getElementById("info");
const scoreBMI = document.getElementById("nilai-bmi");
const detailsBMI = document.getElementById("keterangan-bmi");
const result = document.getElementById("result");
const details = document.getElementById("details");
const learnBtn = document.getElementById("learn");
const modal = document.getElementById("learn-modal");
const closeModalBtn = document.getElementById("close-modal");
const closeBtn = document.getElementById("close");

// Function for calculate BMI and ideal weight range with one digit after decimal
const calculateBMI = (weight, height) => {
  // BMI = Weight/Height^2
  bmi = (weight / height ** 2).toFixed(1);
  // Minimum Ideal Weight = 18.5 * Height^2
  idealMin = (18.5 * height ** 2).toFixed(1);
  // Maximum Ideal Weight = 24.9 * Height^2
  idealMax = (24.9 * height ** 2).toFixed(1);
  return { bmi, idealMin, idealMax };
};

// Function for updating result to the HTML
const updateResult = (sex, age, bmi, idealMin, idealMax, height) => {
  if (bmi < 18.5) {
    // BMI < 18.5
    statusBMI.textContent = "Berat Badan Kurang";
    detailsBMI.textContent = "Berat badan anda kurang dari ideal";
    result.style.borderColor = "orange";
    details.textContent = `Berat badan Anda masih kurang dari ideal. Berdasarkan tinggi badan Anda (${height}m), berat badan ideal Anda ada di antara ${idealMin}kg dan ${idealMax}kg.`;
  } else if (bmi < 25) {
    // 18.5 <= BMI < 25
    statusBMI.textContent = "Berat Badan Normal";
    detailsBMI.textContent = "Berat badan anda sudah ideal";
    result.style.borderColor = "green";
    details.textContent = `Berat badan Anda sudah ideal. Berdasarkan tinggi badan Anda (${height}m), berat badan ideal Anda ada di antara ${idealMin}kg dan ${idealMax}kg.`;
  } else if (bmi < 30) {
    // 25 <= BMI < 30
    statusBMI.textContent = "Berat Badan Lebih";
    detailsBMI.textContent = "Berat badan anda lebih dari ideal";
    result.style.borderColor = "orange";
    details.textContent = `Berat badan Anda lebih dari ideal. Berdasarkan tinggi badan Anda (${height}m), berat badan ideal Anda ada di antara ${idealMin}kg dan ${idealMax}kg.`;
  } else {
    // BMI >= 30
    statusBMI.textContent = "Berat Badan Gemuk";
    detailsBMI.textContent = "Berat badan anda terlalu gemuk (Obesitas)";
    result.style.borderColor = "red";
    details.innerHTML = `Berat badan Anda lebih dari ideal dan termasuk ke kategori obesitas. Berdasarkan tinggi badan Anda (${height}m), berat badan ideal Anda ada di antara ${idealMin}kg dan ${idealMax}kg. Periksakan diri Anda ke dokter untuk mencegah penyakit-penyakit yang berhubungan dengan obesitas. <a href="https://www.alodokter.com/obesitas" target="_blank">Pelajari lebih lanjut</a>`;
  }
  scoreBMI.textContent = bmi;
  info.textContent = `( ${sex} / ${age} tahun )`;

  // Show the result if empty and add animation
  result.classList.add("done", "animated-rotate");
  details.classList.add("done", "animated-scale");

  // remove animation class after 1s (after animation end)
  setTimeout(() => {
    result.classList.remove("animated-rotate");
    details.classList.remove("animated-scale");
  }, 1000);
};

// Function for handle form submit
const onSubmitHandler = (event) => {
  // prevent window reload
  event.preventDefault();

  // remove animation class if form submitted before animation end
  result.classList.remove("animated-rotate");
  details.classList.remove("animated-scale");

  // get value from form and set the value to variable
  const formData = new FormData(form);
  const sex = formData.get("jenis-kelamin");
  const age = Number(formData.get("umur"));
  const weight = Number(formData.get("berat-badan"));
  const height = Number(formData.get("tinggi-badan")) / 100;

  // Calculate BMI and ideal weight
  const { bmi, idealMin, idealMax } = calculateBMI(weight, height);

  // Update HTML
  updateResult(sex, age, bmi, idealMin, idealMax, height);

  // Reset the form value
  form.reset();
};

// Function to handle when mouse over the "learn more" button
const mouseOverHandler = () => {
  learnBtn.textContent = "Pelajari BMI lebih lanjut";
};

// Function to handle when mouse out the "learn more" button
const mouseOutHandler = () => {
  learnBtn.textContent = "?";
};

// Function to handle when "learn more" button clicked
const learnOnClickHandler = () => {
  // hide "learn more" button
  learnBtn.style.display = "none";
  // disable scrolling on the body
  document.querySelector("body").style.overflow = "hidden";
  // show "learn more" modal
  modal.style.display = "block";
};

// Function to handle when close button on modal clicked
const closeModalHandler = () => {
  // show "learn more" button
  learnBtn.style.display = "block";
  // enable scrolling on the body
  document.querySelector("body").style.overflow = "auto";
  // hide "learn more" modal
  modal.style.display = "none";
};

// Add event listener to handle when form submited
form.addEventListener("submit", onSubmitHandler);

// Add event listener to handle when mouse over, out, or clicked the "learn more" button
learnBtn.addEventListener("mouseover", mouseOverHandler);
learnBtn.addEventListener("mouseout", mouseOutHandler);
learnBtn.addEventListener("click", learnOnClickHandler);

// add event listener to handle when close button on modal clicked
closeModalBtn.addEventListener("click", closeModalHandler);
closeBtn.addEventListener("click", closeModalHandler);
