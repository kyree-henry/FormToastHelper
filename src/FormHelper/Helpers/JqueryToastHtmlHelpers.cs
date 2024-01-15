using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.DependencyInjection;

namespace FormToastHelper
{
    public static class JqueryToastHtmlHelpers
    {
        public static HtmlString RenderFormScript(this IHtmlHelper html, FormConfig config)
        {
            var configuration = config.ViewContext.HttpContext.RequestServices.GetService<FormHelperOptions>();

            return new HtmlString($@"
                            <script>
                                $(document).ready(function () {{
                                    const $form = $('#{config.FormId}');
                                    
                                    $form.attr('jqueryToast')
                                    $form.attr('dataType', '{config.DataType}');
                                    $form.attr('CheckTheFormFieldsMessage', '{configuration.CheckTheFormFieldsMessage}');
                                    $form.attr('redirectDelay', '{configuration.RedirectDelay}');
                                    $form.attr('beforeSubmit', '{config.BeforeSubmit}');
                                    $form.attr('callback', '{config.Callback}');
                                    $form.attr('enableButtonAfterSuccess', '{config.EnableButtonAfterSuccess}');
                                    $form.attr('resetFormAfterSuccess', '{config.ResetFormAfterSuccess}');
                                    $form.attr('toastrPositionClass', '{(config.jqueryToastrPosition == null ? configuration.JqueryToastrDefaultPosition.ToClassName() : config.jqueryToastrPosition.Value.ToClassName())}');

                                }});
                            </script>
                            ");
        }
    }
}
