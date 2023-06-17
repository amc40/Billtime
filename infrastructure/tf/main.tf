  variable "do_token" {
   type = string
    description = "Digital Ocean API token"
}

locals {
  environment = terraform.workspace
  location = "lon1"
  common_tags = ["terraform", "BillTime", local.environment]
}


terraform {
  required_providers {
    digitalocean = {
      source = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
  backend "s3" {
    bucket         	   = "billtime-terraform-backend"
    key              	   = "state/terraform.tfstate"
    region         	   = "eu-west-2"
    encrypt        	   = true
    dynamodb_table = "billtime-terraform-lockid"
  }
}

# Configure the DigitalOcean Provider
provider "digitalocean" {
  token = var.do_token
}

resource "digitalocean_project" "billtime_project" {
  name        = "billtime-${local.environment}"
  description = "A ${local.environment} environment for the billtime app."
  purpose     = "Web Application"
  environment = title(local.environment)
  resources = [
    digitalocean_kubernetes_cluster.billtime_k8s_cluster.urn,
  ]
}

resource "digitalocean_container_registry" "webb_and_wallace_container_registry" {
  name                   = "webb-and-wallace-container-registry"
  subscription_tier_slug = "basic"
  # No option to deploy in lon1 region
  region    = "ams3"
}

resource "digitalocean_kubernetes_cluster" "billtime_k8s_cluster" {
  name   = "billtime-k8s-cluster"
  region = local.location
  version = "1.27.2-do.0"
  node_pool {
    name       = "worker-pool"
    size       = "s-1vcpu-2gb"
    node_count = 2
    tags = local.common_tags
  }
  tags = local.common_tags
}