locals {
  environment = terraform.workspace
  location = "lon1"
  common_tags = {
    source     = "terraform"
    project_name = "BillTime"
    environment = local.environment
  }
  app_service_plan = "/subscriptions/8c6bede9-410c-4a76-b338-bb77eac2e1b1/resourceGroups/KYTv2/providers/Microsoft.Web/serverfarms/KYTv2"
  // TODO: might have to add in https:// prefix
  container_registry_url = "softwirecontainerregistry.azurecr.io"
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

# Set the variable value in *.tfvars file
# or using -var="do_token=..." CLI option
variable "do_token" {}

# Configure the DigitalOcean Provider
provider "digitalocean" {
  token = var.do_token
}

resource "digitalocean_database_db" "bill_time_db" {
  cluster_id = digitalocean_database_cluster.web_and-wallace_db_cluster.id
  name       = "bill_time"
}

resource "digitalocean_database_cluster" "web_and_wallace_db_cluster" {
  name       = "web=and-wallace-postgres-cluster"
  engine     = "mysql"
  version    = "11"
  size       = "db-s-1vcpu-1gb"
  region     = "lon1"
  node_count = 1
}

