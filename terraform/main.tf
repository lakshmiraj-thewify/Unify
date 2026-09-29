terraform {
  required_version = ">= 1.5.0"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }

  backend "gcs" {
    prefix = "terraform/state/unify"
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

# Cloud Run Service running the Next.js container
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

      resources {
        limits = {
          cpu    = "1"
          memory = "512Mi"
        }
      }
    }
  }
}

# Allow anyone on the public internet to visit the website
resource "google_cloud_run_v2_service_iam_member" "public_access" {
  project  = google_cloud_run_v2_service.unify_service.project
  location = google_cloud_run_v2_service.unify_service.location
  name     = google_cloud_run_v2_service.unify_service.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}

output "website_url" {
  value       = google_cloud_run_v2_service.unify_service.uri
  description = "Public URL for the deployed Unify application"
}
