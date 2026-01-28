from rest_framework.views import exception_handler
from rest_framework.response import Response

def custom_exception_handler(exc, context):
	# Call the standard error response from REST framework
	response = exception_handler(exc, context)

	print("custom_exception_handler")

	if response is not None:
		data = response.data

		if "non_field_errors" in data:
			message = data["non_field_errors"][0]
		elif "detail" in data:
			message = data["detail"]
		else:
			message = next(iter(data.values()))[0]

		response.data = {
			"message": message,
		}

	return response
