﻿using Microsoft.AspNetCore.Http;
using System;

namespace FormToastHelper
{
    internal static class FormHelperExtensions
    {
        public static bool IsAjaxRequest(this HttpRequest request)
        {
            if (request == null)
                throw new ArgumentNullException("request");

            if (request.Headers != null)
                return request.Headers["X-Requested-With"] == "XMLHttpRequest";

            return false;
        }

        public static string ToClassName(this ToastrPosition position)
        {
            switch (position)
            {
                case ToastrPosition.TopRight:
                    return "formhelper-toast-top-right";
                case ToastrPosition.BottomRight:
                    return "formhelper-toast-bottom-right";
                case ToastrPosition.BottomLeft:
                    return "formhelper-toast-bottom-left";
                case ToastrPosition.TopLeft:
                    return "formhelper-toast-top-left";
                case ToastrPosition.TopFullWidth:
                    return "formhelper-toast-top-full-width";
                case ToastrPosition.BottomFullWidth:
                    return "formhelper-toast-bottom-full-width";
                case ToastrPosition.TopCenter:
                    return "formhelper-toast-bottom-full-width";
                case ToastrPosition.BottomCenter:
                    return "formhelper-toast-bottom-center";
                default:
                    return "formhelper-toast-top-right";
            }
        }

        public static string ToClassName(this JqueryToastrPosition position)
        {
            switch (position)
            {
                case JqueryToastrPosition.TopRight:
                    return "top-right";
                case JqueryToastrPosition.BottomRight:
                    return "bottom-right";
                case JqueryToastrPosition.BottomLeft:
                    return "bottom-left";
                case JqueryToastrPosition.TopLeft:
                    return "top-left";
                case JqueryToastrPosition.MidCenter:
                    return "mid-center";
                case JqueryToastrPosition.TopCenter:
                    return "top-center";
                case JqueryToastrPosition.BottomCenter:
                    return "bottom-center";
                default:
                    return "top-right";
            }
        }
    }
}
