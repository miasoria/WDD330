
document.addEventListener("DOMContentLoaded", () => {

  function alertMessage(message, scroll = true) {
    const main = document.querySelector("main") || document.body;

   
    const alert = document.createElement("div");
    alert.classList.add("alert");
    alert.style =
      "background: #525b0f; color: white; padding: 1rem; margin-bottom: 1rem; border: 1px solid #f5c6cb; border-radius: 5px; position: relative;";

    alert.innerHTML = `
      <span class="alert-message">${message}</span>
      <button type="button" class="alert-close" style="position: absolute; top: 5px; right: 10px; background: transparent; border: none; font-size: 1.2rem; cursor: pointer;">&times;</button>
    `;

    
    alert.querySelector(".alert-close").addEventListener("click", () => {
      main.removeChild(alert);
    });

    
    main.prepend(alert);

    
    if (scroll) window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const form = document.getElementById("newsletter-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

   
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const firstName = form.firstName.value.trim();
    const lastName = form.lastName.value.trim();
    const email = form.email.value.trim();


    alertMessage(`Thank you for subscribing, ${firstName} ${lastName}! 🎉`);

    
    form.reset();
  });
});

