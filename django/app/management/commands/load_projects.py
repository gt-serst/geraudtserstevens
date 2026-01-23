import json
from django.core.management.base import BaseCommand
from app.models import Project

class Command(BaseCommand):
	def handle(self, *args, **kwargs):
		with open("app/data/projects.json") as f:
			projects = json.load(f)

		for p in projects:
			Project.objects.get_or_create(
				title=p["title"],
				defaults=p
			)

		self.stdout.write(self.style.SUCCESS("Projects loaded"))
