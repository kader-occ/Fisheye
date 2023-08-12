const displayModal = () => {
  const contactModal = document.getElementById("contact_modal");
  contactModal.style.display = "block";

  //tab1
  contactModal.role = "dialog";
  contactModal.tabIndex = 0;
  contactModal.setAttribute(
    "aria-label",
    "Contactez moi " + photographData.name
  );
  contactModal.setAttribute("aria-hidden", "true");

  const h2 = document.querySelector("h2");
  const imgBtnCloseContactModal = h2.nextElementSibling;
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
  h2.tabIndex = 1;

  //tab3
  labelPrenom.tabIndex = 2;
  inputPrenom.id = "prenom_form";
  inputPrenom.placeholder = "Votre prénom";
  inputPrenom.focus();
  //tab4
  inputPrenom.tabIndex = 3;

  labelNom.textContent = "Nom";
  //tab5
  labelNom.tabIndex = 4;
  inputNom.id = "nom_form";
  inputNom.placeholder = "Votre nom";
  //tab6
  inputNom.tabIndex = 5;

  labelEmail.textContent = "Email";
  //tab7
  labelEmail.tabIndex = 6;
  inputEmail.id = "email_form";
  inputEmail.placeholder = "Votre email";
  //tab8
  inputEmail.tabIndex = 7;

  labelMessage.textContent = "Message";
  //tab9
  labelMessage.tabIndex = 8;
  textAreaMessage.id = "message_form";
  textAreaMessage.placeholder = "Votre message";
  //tab10
  textAreaMessage.tabIndex = 9;

  //tab11
  buttonSubmit.tabIndex = 10;

  //tab12
  imgBtnCloseContactModal.tabIndex = 11;

  imgBtnCloseContactModal.addEventListener("keypress", (ev) => {
    if (ev.key === "Enter") {
      closeContactModal();
    }
  });

  contactModal.addEventListener("keyup", (ev) => {
    if (ev.key === "Escape") {
      closeContactModal();
    }
  });

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

    closeContactModal();
  });
};

const closeContactModal = () => {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
};
