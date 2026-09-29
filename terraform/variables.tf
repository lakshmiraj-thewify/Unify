variable "project_id" {
  type        = string
  description = "GCP Project ID"
}

variable "region" {
  type        = string
  default     = "us-central1"
  description = "GCP Region"
}

variable "service_name" {
  type        = string
  default     = "unify-website"
  description = "Cloud Run service name"
}

variable "image_tag" {
  type        = string
  description = "Full Artifact Registry image URI with tag"
}
