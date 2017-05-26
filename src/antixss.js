(function () {
   var XSSObject = new Object();
   XSSObject.lockdown = function (obj, name) {
      if (!String.prototype.startsWith) {
         try {
            if (Object.defineProperty) {
                Object.defineProperty(obj, name, {
	            configurable: false
                });
            };
         } catch (e) { };
      }
   }
   XSSObject.proxy = function (obj, name, report_function_name, exec_original) {
      var proxy = obj[name];
      obj[name] = function () {
         if (exec_original) {
            return proxy.apply(this, arguments);
         }
      };
      XSSObject.lockdown(obj, name);
   };
   XSSObject.proxy(window, 'alert', 'window.alert', false);
   XSSObject.proxy(window, 'confirm', 'window.confirm', false);
   XSSObject.proxy(window, 'prompt', 'window.prompt', false);
   XSSObject.proxy(window, 'unescape', 'unescape', false);
   XSSObject.proxy(document, 'write', 'document.write', false);
   XSSObject.proxy(document, 'write', 'document.writeln', false); /* added to original */
   XSSObject.proxy(String, 'fromCharCode', 'String.fromCharCode', true);
})();
