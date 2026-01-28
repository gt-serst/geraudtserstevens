def custom_errors_handler(default_errors):

	new_error = {}

	if "non_field_errors" in default_errors:
		new_error["message"] = default_errors["non_field_errors"][0]
	elif "password" in default_errors:
		new_error["message"] = default_errors["password"][0]
	return new_error
