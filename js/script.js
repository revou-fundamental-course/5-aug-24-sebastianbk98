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

const calculateBMI = (weight, height) => {
  bmi = (weight / height ** 2).toFixed(1);
  idealMin = (18.5 * height ** 2).toFixed(1);
  idealMax = (24.9 * height ** 2).toFixed(1);
  return { bmi, idealMin, idealMax };
};

const updateResult = (sex, age, bmi, idealMin, idealMax, height) => {
  if (bmi < 18.5) {
    statusBMI.textContent = "Berat Badan Kurang";
    detailsBMI.textContent = "Berat badan anda kurang dari ideal";
    result.style.borderColor = "orange";
    details.textContent = `Berat badan Anda masih kurang dari ideal. Berdasarkan tinggi badan Anda (${height}m), berat badan ideal Anda ada di antara ${idealMin}kg dan ${idealMax}kg.`;
  } else if (bmi < 25) {
    statusBMI.textContent = "Berat Badan Normal";
    detailsBMI.textContent = "Berat badan anda sudah ideal";
    result.style.borderColor = "green";
    details.textContent = `Berat badan Anda sudah ideal. Berdasarkan tinggi badan Anda (${height}m), berat badan ideal Anda ada di antara ${idealMin}kg dan ${idealMax}kg.`;
  } else if (bmi < 30) {
    statusBMI.textContent = "Berat Badan Lebih";
    detailsBMI.textContent = "Berat badan anda lebih dari ideal";
    result.style.borderColor = "orange";
    details.textContent = `Berat badan Anda lebih dari ideal. Berdasarkan tinggi badan Anda (${height}m), berat badan ideal Anda ada di antara ${idealMin}kg dan ${idealMax}kg.`;
  } else {
    statusBMI.textContent = "Berat Badan Gemuk";
    detailsBMI.textContent = "Berat badan anda terlalu gemuk (Obesitas)";
    result.style.borderColor = "red";
    details.innerHTML = `Berat badan Anda lebih dari ideal dan termasuk ke kategori obesitas. Berdasarkan tinggi badan Anda (${height}m), berat badan ideal Anda ada di antara ${idealMin}kg dan ${idealMax}kg. Periksakan diri Anda ke dokter untuk mencegah penyakit-penyakit yang berhubungan dengan obesitas. <a href="https://www.alodokter.com/obesitas" target="_blank">Pelajari lebih lanjut</a>`;
  }
  scoreBMI.textContent = bmi;
  info.textContent = `( ${sex} / ${age} tahun )`;
  result.classList.add("done", "animated-rotate");
  details.classList.add("done", "animated-scale");
  setTimeout(() => {
    result.classList.remove("animated-rotate");
    details.classList.remove("animated-scale");
  }, 1000);
};

const onSubmitHandler = (event) => {
  event.preventDefault();
  result.classList.remove("animated");
  const formData = new FormData(form);
  const sex = formData.get("jenis-kelamin");
  const age = Number(formData.get("umur"));
  const weight = Number(formData.get("berat-badan"));
  const height = Number(formData.get("tinggi-badan")) / 100;
  const { bmi, idealMin, idealMax } = calculateBMI(weight, height);
  updateResult(sex, age, bmi, idealMin, idealMax, height);
  form.reset();
};

const mouseOverHandler = () => {
  learnBtn.textContent = "Pelajari BMI lebih lanjut";
};

const mouseOutHandler = () => {
  learnBtn.textContent = "?";
};

const learnOnClickHandler = () => {
  document.querySelector("body").style.overflow = "hidden";
  modal.style.display = "block";
};

const closeModalHandler = () => {
  modal.style.display = "none";
  document.querySelector("body").style.overflow = "auto";
};

form.addEventListener("submit", onSubmitHandler);
learnBtn.addEventListener("mouseover", mouseOverHandler);
learnBtn.addEventListener("mouseout", mouseOutHandler);
learnBtn.addEventListener("click", learnOnClickHandler);
closeModalBtn.addEventListener("click", closeModalHandler);
closeBtn.addEventListener("click", closeModalHandler);
