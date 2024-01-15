﻿namespace FormToastHelper
{
    public class FormHelperOptions
    {
        public string CheckTheFormFieldsMessage { get; set; } = "Check the form fields.";
        public int RedirectDelay { get; set; } = 1500;
        public ToastrPosition ToastrDefaultPosition = ToastrPosition.TopRight;
        public JqueryToastrPosition JqueryToastrDefaultPosition = JqueryToastrPosition.TopRight;
        public bool EmbeddedFiles { get; set; } = true;
    }
}