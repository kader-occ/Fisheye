/**
 * Fonction Affiche Contact Form
 */
export const displayModal = (photographData) => {
  const contactModal = document.getElementById("contact_modal");
  contactModal.style.display = "block";

  //Tab1
  contactModal.role = "dialog";
  contactModal.tabIndex = 1;
  contactModal.focus();

  const form = document.querySelector("form");
  const titleForm = document.querySelector("h2");
  const imgBtnCloseContactModal = titleForm.nextElementSibling;
  const labelPrenom = document.getElementsByTagName("label")[1];
  const inputPrenom = document.querySelector("input");
  const divNom = document.createElement("div");
  const divEmail = document.createElement("div");
  const divMessage = document.createElement("div");
  const buttonSubmitFormContact = document.querySelector("button[type=submit]");
  const labelNom = document.createElement("label");
  const labelEmail = document.createElement("label");
  const labelMessage = document.createElement("label");
  const inputNom = document.createElement("input");
  const inputEmail = document.createElement("input");
  const textAreaMessage = document.createElement("textarea");
  const spanLastFocus = document.createElement("span");

  titleForm.textContent = "Contacter " + photographData.name;
  //Tab2
  titleForm.tabIndex = 2;

  labelPrenom.id = "prenom_form";
  //Tab3
  labelPrenom.tabIndex = 3;
  inputPrenom.id = "prenom_form";
  inputPrenom.placeholder = "Veuillez saisir votre prénom";
  inputPrenom.required = true;
  //Tab4
  inputPrenom.tabIndex = 4;

  labelNom.textContent = "Nom";
  labelNom.id = "nom_form";
  //Tab5
  labelNom.tabIndex = 5;
  inputNom.id = "nom_form";
  inputNom.placeholder = "Veuillez saisir votre nom";
  inputNom.required = true;
  //Tab6
  inputNom.tabIndex = 6;

  labelEmail.textContent = "Email";
  labelEmail.id = "email_form";
  //Tab7
  labelEmail.tabIndex = 7;
  inputEmail.id = "email_form";
  inputEmail.placeholder = "Veuillez saisir votre email";
  inputEmail.required = true;
  //Tab8
  inputEmail.tabIndex = 8;

  labelMessage.textContent = "Message";
  labelMessage.id = "message_form";
  //Tab9
  labelMessage.tabIndex = 9;
  textAreaMessage.id = "message_form";
  textAreaMessage.placeholder = "Veuillez saisir votre message";
  textAreaMessage.setAttribute("aria-label", "Veuillez saisir votre message");
  textAreaMessage.required = true;
  //Tab10
  textAreaMessage.tabIndex = 10;

  //Tab11
  buttonSubmitFormContact.tabIndex = 11;

  //Tab12
  imgBtnCloseContactModal.setAttribute(
    "alt",
    "Fermer le formulaire de contact"
  );
  imgBtnCloseContactModal.tabIndex = 12;
  imgBtnCloseContactModal.addEventListener("click", (ev) => {
    ev.preventDefault();
    closeContactModal();
  });

  //Tab 13 Dernier focus
  spanLastFocus.tabIndex = 13;

  divNom.id = "nom";
  divNom.append(labelNom);
  divNom.append(inputNom);

  divEmail.id = "email";
  divEmail.append(labelEmail);
  divEmail.append(inputEmail);

  divMessage.id = "message";
  divMessage.append(labelMessage);
  divMessage.append(textAreaMessage);

  buttonSubmitFormContact.before(divNom);
  buttonSubmitFormContact.before(divEmail);
  buttonSubmitFormContact.before(divMessage);
  titleForm.after(spanLastFocus);

  buttonSubmitFormContact.setAttribute("aria-label", "Soumettre le formulaire");

  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const dataForm = {
      "Prénom : ": form.inputPrenom.value,
      "Nom : ": form.inputNom.value,
      "Email : ": form.inputEmail.value,
      "Message : ": form.textAreaMessage.value,
    };
    logFormData(dataForm);
  });

  imgBtnCloseContactModal.addEventListener("keypress", (ev) => {
    if (ev.key === "Enter") {
      closeContactModal();
    }
  });

  contactModal.addEventListener("keyup", (ev) => {
    if (ev.key === "Escape") {
      closeContactModal();
    }
    if (ev.key === "Tab") {
      console.log(document.activeElement.tabIndex);
      if (document.activeElement.tabIndex === 13) {
        contactModal.focus();
      }
    }
  });
};

/**
 * Log le formulaire
 * @param {Object} dataForm
 */
const logFormData = (dataForm) => {
  console.log(dataForm);
};

/**
 * Ferme la modal
 */
const closeContactModal = () => {
  const modal = document.getElementById("contact_modal");
  const labelPrenom = document.getElementById("prenom_form");
  const inputPrenom = labelPrenom.nextElementSibling;
  const divNom = document.getElementById("nom");
  const divEmail = document.getElementById("email");
  const divMessage = document.getElementById("message");

  inputPrenom.value = "";

  if (divNom) divNom.remove();
  if (divEmail) divEmail.remove();
  if (divMessage) divMessage.remove();

  modal.style.display = "none";
};
