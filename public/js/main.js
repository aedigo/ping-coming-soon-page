"use strict";

const App = (function () {
  const input = $("#email");
  return {
    init() {
      this.initEvent();
    },

    initEvent() {
      $("#cta").click(this.handleCTA);
      input.keyup(this.handleEmptyInput);
    },

    handleCTA(e) {
      e.preventDefault();

      const email = input.val();

      if (!App.verifyEmail(email)) {
        input.addClass("form__email__input-error");
        App.toggleFocus();
        return App.formError();
      } else {
        if ($(".form__sucess").length > 0) {
          return;
        }
        if ($(".form__error").length > 0) {
          App.deleteElement(".form__error");
        }
        App.toggleFocus(true);
        const pTag = App.createElement("Thank you for subscribing!")
          .addClass("form__sucess")
          .addClass("form__sucess--animation");
        input.removeAttr("aria-invalid").removeClass("form__email__input-error").attr("readonly", "");
        $("#cta").attr("disabled", "");

        setTimeout(function () {
          App.deleteElement(".form__sucess");
          $("#cta").removeAttr("disabled");
          input.removeAttr("readonly");
        }, 3000);
        input.val("");
        return input.after(pTag);
      }
    },

    handleEmptyInput() {
      if ($(".form__error").length) {
        if (input.val() === "") {
          input.removeClass("form__email__input-error");
          App.deleteElement(".form__error");
          App.toggleFocus(true);
        }
      }
    },

    formError() {
      if ($(".form__error").length) return;
      const pTag = App.createElement(
        "Please provide a valid email address"
      ).addClass("form__error");
      return input.attr("aria-invalid", "true").after(pTag);
    },

    verifyEmail(email) {
      if (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          email
        )
      ) {
        return true;
      }
      return false;
    },

    createElement(text) {
      return $("<p></p>").text(text);
    },

    deleteElement(element) {
      $(element).remove();
    },
    toggleFocus(value) {
      if (value) return input.addClass("form__email--focus");
      return input.removeClass("form__email--focus");
    },
  };
})();

App.init();
