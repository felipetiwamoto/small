*** Form Saver *** 

This is a library to save all forms into the local storage.
Sometimes we can't finish to fill a form right alway, but then
we need to fill the entire form again, or maybe the connection
get lost, the battery get lost and etc...

However, with this library, no matter what happens, when the user 
comes back to your website, the form will be filled with the
information he had put on it.

**** Availables methods ****

```formSaver.clear()``` 
This method clear the entire formSaver from local storage.
You can pass the form ID as a parameter to clear just that
especific form. (formSaver.clear("form-id"))

```formSaver.get()``` 
This method get the entire formSaver from local storage.
You can pass the form ID as a parameter to get just that
especific form. (formSaver.get("form-id"))
