const displayModal = () => {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";

  //tab1
  modal.role = "dialog";
  modal.tabIndex = 0;
  modal.setAttribute("aria-label", "Contactez moi " + photographData.name);
  modal.setAttribute("aria-hidden", "true");

  const h2 = document.querySelector("h2");
  const imgBtnCloseModal = h2.nextElementSibling;
  const inputPrenom = document.querySelector("input");
  const labelPrenom = document.querySelector("label");
  const divNom = document.createElement("div");
  const divEmail = document.createElement("div");
  const divMessage = document.createElement("div");
  const buttonSubmit = document.querySelector("button[type=submit]");
  const labelNom = document.createElement("label");
  const labelEmail = document.createElement("label");
  const labelMessage = document.createElement("label");
  const inputNom = document.createElement("input");
  const inputEmail = document.createElement("input");
  const textAreaMessage = document.createElement("textarea");

  h2.textContent = "Contactez moi " + photographData.name;
  //tab2
  h2.tabIndex = 0;

  //tab3
  labelPrenom.tabIndex = 0;
  inputPrenom.id = "prenom_form";
  inputPrenom.placeholder = "Votre prénom";
  //tab4
  inputPrenom.tabIndex = 0;

  labelNom.textContent = "Nom";
  //tab5
  labelNom.tabIndex = 0;
  inputNom.id = "nom_form";
  inputNom.placeholder = "Votre nom";
  //tab6
  inputNom.tabIndex = 0;

  labelEmail.textContent = "Email";
  //tab7
  labelEmail.tabIndex = 0;
  inputEmail.id = "email_form";
  inputEmail.placeholder = "Votre email";
  //tab8
  inputEmail.tabIndex = 0;

  labelMessage.textContent = "Message";
  //tab9
  labelMessage.tabIndex = 0;
  textAreaMessage.id = "message_form";
  textAreaMessage.placeholder = "Votre message";
  //tab10
  textAreaMessage.tabIndex = 0;

  //tab11
  buttonSubmit.tabIndex = 0;

  //tab12
  imgBtnCloseModal.tabIndex = 0;

  divNom.append(labelNom);
  divNom.append(inputNom);

  divEmail.append(labelEmail);
  divEmail.append(inputEmail);

  divMessage.append(labelMessage);
  divMessage.append(textAreaMessage);

  buttonSubmit.before(divNom);
  buttonSubmit.before(divEmail);
  buttonSubmit.before(divMessage);

  buttonSubmit.addEventListener("click", (ev) => {
    ev.preventDefault();

    console.log(
      "Prénom : " + inputPrenom.value,
      "Nom : " + inputNom.value,
      "Email : " + inputEmail.value,
      "Message : " + textAreaMessage.value
    );
  });
};

const closeModal = () => {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
};
