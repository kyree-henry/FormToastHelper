using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.TagHelpers;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.TagHelpers;
using Microsoft.Extensions.DependencyInjection;
using System.Threading.Tasks;

namespace FormToastHelper.TagHelpers
{
    [HtmlTargetElement("form", Attributes = "asp-jquerytoast")]
    [HtmlTargetElement("jquerytoast")]
    public class JqueyToastTagHelper : FormTagHelper
    {
        public JqueyToastTagHelper(IHtmlGenerator generator) : base(generator)
        {
        }

        [HtmlAttributeName("asp-callback")]
        public string Callback { get; set; }

        [HtmlAttributeName("asp-beforeSubmit")]
        public string BeforeSubmit { get; set; }

        [HtmlAttributeName("asp-dataType")]
        public FormDataType DataType { get; set; } = FormDataType.FormData;

        [HtmlAttributeName("asp-enableButtonAfterSuccess")]
        public bool EnableButtonAfterSuccess { get; set; } = false;

        [HtmlAttributeName("asp-resetFormAfterSuccess")]
        public bool ResetFormAfterSuccess { get; set; } = true;

        [HtmlAttributeName("asp-toastrPosition")]
        public JqueryToastrPosition? ToastrPosition { get; set; }

        public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
        {
            var usedJqueryToastTag = output.TagName == "jquerytoast";

            if (usedJqueryToastTag)
            {
                output.TagName = "form";
            }
            else
            {
                if (usedJqueryToastTag == false)
                {
                    return;
                }
            }

            var configuration = ViewContext.HttpContext.RequestServices.GetService<FormHelperOptions>();
            output.Attributes.Add("jquerytoast", null);
            output.Attributes.Add("dataType", DataType.ToString());
            output.Attributes.Add("redirectDelay", configuration.RedirectDelay);


            if (!string.IsNullOrWhiteSpace(Callback))
            {
                output.Attributes.Add("callback", Callback);
            }

            if (!string.IsNullOrWhiteSpace(BeforeSubmit))
            {
                output.Attributes.Add("beforeSubmit", BeforeSubmit);
            }

            if (ToastrPosition == null)
            {
                output.Attributes.Add("toastrPositionClass", configuration.JqueryToastrDefaultPosition.ToClassName());
            }
            else
            {
                output.Attributes.Add("toastrPositionClass", ToastrPosition.Value.ToClassName());
            }

            output.Attributes.Add("enableButtonAfterSuccess", EnableButtonAfterSuccess);
            output.Attributes.Add("resetFormAfterSuccess", ResetFormAfterSuccess);
            output.Attributes.Add("checkTheFormFieldsMessage", configuration.CheckTheFormFieldsMessage);

            if (usedJqueryToastTag)
            {
                await base.ProcessAsync(context, output);
            }
        }
    }
}
