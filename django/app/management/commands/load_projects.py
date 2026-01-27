import json
from django.core.management.base import BaseCommand
from app.models import Project, ProjectImage
from pathlib import Path
from django.core.files import File

class Command(BaseCommand):
	def handle(self, *args, **kwargs):
		projects_already_loaded = Project.objects.all()

		if projects_already_loaded:
			self.stdout.write(self.style.SUCCESS("Projects already loaded."))
			return

		with open("app/data/projects.json") as f:
			projects = json.load(f)

		for p in projects:
			project = Project(
				title=p["title"],
				description=p["description"],
				content=p["content"]
			)
			cover_path = Path("app/media") / p["cover"]
			with cover_path.open(mode="rb") as f:
				project.cover = File(f, name=cover_path.name)
				project.save()
			for image in p["images"]:
				image_path = Path("app/media") / image
				with image_path.open(mode="rb") as f:
					project_image = ProjectImage(
						project=project,
						image=File(f, name=image_path.name)
					)
					project_image.save()

		self.stdout.write(self.style.SUCCESS("Projects loaded successfully."))
