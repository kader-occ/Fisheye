const displayModal = () => {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
};

const closeModal = () => {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
};

const btnFormSubmit = document.querySelector("#btn_form_submit");

btnFormSubmit.addEventListener("click", (ev) => {
  ev.preventDefault();

  const inputNom = document.querySelector("#nom_form");
  const inputEmail = document.querySelector("#email_form");
  const textAreaMassage = document.querySelector("#message_form");

  console.log(
    "Nom : " + inputNom.value,
    "Email : " + inputEmail.value,
    "Message : " + textAreaMassage.value
  );
});
