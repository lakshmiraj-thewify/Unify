terraform {
  required_version = ">= 1.0"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
  backend "gcs" {
    prefix = "terraform/state"
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

resource "google_cloud_run_v2_service" "unify_service" {
  name     = var.service_name
  location = var.region
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    containers {
      image = var.image_tag

      ports {
        container_port = 3000
      }

      env {
        name  = "HOSTNAME"
        value = "0.0.0.0"
      }

      resources {
        limits = {
          cpu    = "1"
          memory = "1Gi"
        }
      }
    }
    scaling {
      min_instance_count = 0
      max_instance_count = 2
    }
  }
}

resource "google_cloud_run_service_iam_member" "public_access" {
  location = google_cloud_run_v2_service.unify_service.location
  project  = google_cloud_run_v2_service.unify_service.project
  service  = google_cloud_run_v2_service.unify_service.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}

output "website_url" {
  description = "The public URL of the Unify website"
  value       = google_cloud_run_v2_service.unify_service.uri
}
