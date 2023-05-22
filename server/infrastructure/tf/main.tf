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
    digitalocean_database_cluster.web_and_wallace_db_cluster.urn,
  ]
}

resource "digitalocean_vpc" "billtime_vpc" {
  name      = "billtime-vpc"
  region    = local.location
}

resource "digitalocean_database_db" "billtime_db" {
  cluster_id = digitalocean_database_cluster.web_and_wallace_db_cluster.id
  name       = "billtime"
}

resource "digitalocean_database_cluster" "web_and_wallace_db_cluster" {
  name       = "web-and-wallace-postgres-cluster"
  engine     = "mysql"
  version    = "8"
  size       = "db-s-1vcpu-1gb"
  region     = local.location
  node_count = 1
  tags = local.common_tags
  private_network_uuid = digitalocean_vpc.billtime_vpc.id
}

resource "digitalocean_droplet" "billtime_droplet" {
  name      = "billtime-droplet"
  image     = "ubuntu-20-04-x64"
  region    = local.location
  size      = "s-1vcpu-1gb"
  tags = local.common_tags
  vpc_uuid  = digitalocean_vpc.billtime_vpc.id
}

resource "digitalocean_database_firewall" "web_and_wallace_db_cluster_firewall" {
  cluster_id = digitalocean_database_cluster.web_and_wallace_db_cluster.id

  rule {
    type  = "droplet"
    value = digitalocean_droplet.billtime_droplet.id
  }
}

resource "digitalocean_firewall" "billtime_droplet_firewall" {
  name = "billtime-droplet-firewall"
  droplet_ids = [ digitalocean_droplet.billtime_droplet.id ]

  inbound_rule {
    protocol         = "tcp"
    port_range       = "80"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
    protocol              = "tcp"
    port_range            = "3306"
    destination_addresses = [digitalocean_vpc.billtime_vpc.ip_range, "::/0"]
  }
}