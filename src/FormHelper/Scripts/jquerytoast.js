﻿(function ($) {
    "use strict";

    $(document).on("click", "form[jqueryToast]", (element) => {
        const form = $(element.currentTarget);
        const options = {
            url: form.attr("action"),
            method: form.attr("method"),
            dataType: form.attr("dataType"),
            checkTheFormFieldsMessage: form.attr("CheckTheFormFieldsMessage"),
            redirectDelay: parseInt(form.attr("redirectDelay")),
            beforeSubmit: form.attr("beforeSubmit"),
            callback: form.attr("callback"),
            enableButtonAfterSuccess:
                form.attr("enableButtonAfterSuccess") === "True",
            resetFormAfterSuccess: form.attr("ResetFormAfterSuccess") === "True",
            toastrPositionClass: form.attr("toastrPositionClass"),
        };

        return new $.jquerytoast(options, form[0]);
    });

    function mobileAndTabletcheck() {
        var check = false;
        (function (a) {
            if (
                /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
                    a
                ) ||
                /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                    a.substr(0, 4)
                )
            )
                check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    }

    function callFunction(name, result) {
        var parts = name.split(".");
        var n;
        var obj = window;
        for (n = 0; n < parts.length; ++n) {
            obj = obj[parts[n]];
            if (!obj) {
                return;
            }
        }
        return obj ? obj(result) : undefined;
    }

    $.jquerytoast = function (options, el) {
        var self = this;
        var $form = $(el);

        if (window.FormData === undefined) {
            $form.find("button[type='submit']").attr("disabled", "disabled");
            alert(
                "Your internet browser is too old and not compatible with Form Helper! Update your browser."
            );
            return;
        }

        $($form)
            .find("input, select, textarea")
            .on("blur", function (el) {
                $(el.target).valid();
            });

        options = $.extend({}, $.formhelper.defaultOptions, options);

        $form.unbind("submit");

        $form.on("submit", function (e) {
            e.preventDefault();

            var toastrOptions = {
                positionClass: options.toastrPositionClass,
            };

            $form.removeData("validator");
            $form.removeData("unobtrusiveValidation");
            $.validator.unobtrusive.parse($form);

            var validationResult = $form.valid();
            var validator = $form.validate();

            if (!validationResult) {
                $.toast({
                    heading: 'Error',
                    icon: 'error',
                    text: options.checkTheFormFieldsMessage,
                    position: toastrOptions.positionClass,
                });
                validator.focusInvalid();
                return false;
            }

            $form.find("button[type='submit']").attr("disabled", "disabled");
            $form.find("button[type='submit']").children().hide();
            $form.find("button[type='submit']").prepend($("<span>").attr({ class: "spinner-border spinner-border-sm me-2", role: "status", "aria-hidden": "true" }));

            var headers = {};
            var formData = {};
            var contentType = {};

            if (options.dataType === "FormData") {
                formData = new FormData($form[0]);
                contentType = false;
            } else {
                var formDataAsJson = new Object();

                $.each($form.serializeArray(), function (key, item) {
                    formDataAsJson[item.name] = item.value;
                });

                if (formDataAsJson.__RequestVerificationToken !== undefined) {
                    headers["RequestVerificationToken"] =
                        formDataAsJson.__RequestVerificationToken;
                }

                formData = JSON.stringify(formDataAsJson);
                contentType = "application/json; charset=utf-8";
            }

            //send ajax

            $.ajax({
                url: options.url,
                type: options.method,
                headers: headers,
                data: formData,
                contentType: contentType,
                processData: false,
                beforeSend: function (jqXHR, settings) {
                    if (options.beforeSubmit) {
                        return window[options.beforeSubmit](jqXHR, settings, $form);
                    }
                },
                success: function (result, status) {
                    if (result.isSucceed === false) {
                        $form.find("button[type='submit']").removeAttr("disabled");
                        $form.find("button[type='submit']").children().show();
                        $form.find("button[type='submit']").find("span[role='status']").remove();
                    }



                    if (result.redirectUri) {
                        toastrOptions = {
                            timeOut: 0,
                            extendedTimeOut: 0,
                            positionClass: toastrOptions.positionClass,
                        };
                    }

                    var hasMessage = result.message && result.message !== "";

                    if (hasMessage) {
                        if (result.status === 1 || result.status === "Success") {
                            $.toast({
                                icon: 'success',
                                heading: 'Success',
                                text: result.message,
                                position: toastrOptions.positionClass,
                            });

                        } else if (result.status === 2 || result.status === "Info") {
                            $.toast({
                                icon: 'info',
                                heading: 'Information',
                                text: result.message,
                                position: toastrOptions.positionClass,
                            });

                        } else if (result.status === 3 || result.status === "Warning") {
                            $.toast({
                                icon: 'warning',
                                heading: 'Warning',
                                text: result.message,
                                position: toastrOptions.positionClass,
                            });

                        } else if (result.status === 4 || result.status === "Error") {
                            $.toast({
                                icon: 'error',
                                heading: 'Error',
                                text: result.message,
                                position: toastrOptions.positionClass,
                            });
                        }
                    } else if (result.isSucceed === false) {
                        $.toast({
                            icon: 'error',
                            heading: 'Error',
                            text: options.checkTheFormFieldsMessage,
                            position: toastrOptions.positionClass,
                        });
                    }

                    if (result.validationErrors && result.validationErrors.length > 0) {
                        $form.find("button[type='submit']").removeAttr("disabled");
                        $form.find("button[type='submit']").children().show();
                        $form.find("button[type='submit']").find("span[role='status']").remove();

                        for (var i in result.validationErrors) {
                            var propertyName = result.validationErrors[i].propertyName;
                            var errorMessage = result.validationErrors[i].message;
                            var obj = new Object();
                            obj[propertyName] = errorMessage;
                            validator.showErrors(obj);
                        }

                        validator.focusInvalid();
                    }

                    if (options.callback) {
                        callFunction(options.callback, result);
                    }

                    var delay = result.redirectDelay
                        ? result.redirectDelay
                        : options.redirectDelay;

                    if (result.redirectUri) {
                        setTimeout(
                            function () {
                                window.location.replace(result.redirectUri);
                            },
                            hasMessage ? delay : 1
                        );
                    }

                    if (options.enableButtonAfterSuccess) {
                        $form.find("button[type='submit']").removeAttr("disabled");
                        $form.find("button[type='submit']").children().show();
                        $form.find("button[type='submit']").find("span[role='status']").remove();
                    }

                    if (result.status === 1 || result.status === "Success") {
                        if (options.resetFormAfterSuccess) {
                            $form[0].reset();
                        }
                    }
                },
                error: function (request, status, error) {
                    console.error(request.responseText);

                    fhToastr.error(request.responseText, null, toastrOptions);
                },
            });

            //end ajax request
        });
    };

    $.formhelper.defaultOptions = {
        url: "#",
        method: "POST",
        dataType: "FormData",
        checkTheFormFieldsMessage: "Check the form fields",
        redirectDelay: 1500,
        beforeSubmit: null,
        callback: null,
        enableButtonAfterSuccess: false,
        resetFormAfterSuccess: false,
        toastrPositionClass: null,
    };

    $.fn.fillFormFields = function (data, callbacks = null) {
        var that = this;

        var options = {
            data: data || null,
            callbacks: callbacks,
        };

        if (options.data !== null) {
            $.each(options.data, function (k, v) {
                if (
                    options.callbacks != undefined &&
                    options.callbacks != null &&
                    options.callbacks.hasOwnProperty(k)
                ) {
                    options.callbacks[k](v);
                } else {
                    var el = $("#" + that[0].id + ' [name="' + k + '" i]');
                    if (
                        el.prop("tagName") == "SELECT" &&
                        el.attr("multiple") !== undefined &&
                        el.attr("enumflags") !== undefined
                    ) {
                        var values = v.toString().split(/[ ,]+/);
                        el.val(values);
                    } else if (
                        el.prop("tagName") == "INPUT" &&
                        el.prop("type").toUpperCase() == "CHECKBOX"
                    ) {
                        if (v === true || v == "true" || v == "1") {
                            el.attr("checked", "checked");
                        } else {
                            el.removeAttr("checked");
                        }
                    } else if (
                        el.prop("tagName") == "INPUT" &&
                        el.prop("type").toUpperCase() == "RADIO"
                    ) {
                        $(`input[name=${k}][value=${v}`).prop("checked", true);
                    } else {
                        el.val(v);
                    }
                }
            });
        }
    };

    $.fn.fhReset = function () {
        this[0].reset();
        this.find("input[type='submit'],button[type='submit']").removeAttr(
            "disabled"
        );
        this.find("input[type='submit'],button[type='submit']").find("span[role='status']").remove()
        this.find("[class*='field-validation']").empty();
    };
})(jQuery);
