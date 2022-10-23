variable "prefix" {}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "example" {
  name     = "IaC-Terraform"
  location = "eastus"
}

resource "azurerm_cosmosdb_account" "example" {
  name                = "${var.prefix}-cosmosdb-01"
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name
  offer_type          = "Standard"
  kind                = "GlobalDocumentDB"

  consistency_policy {
    consistency_level       = "BoundedStaleness"
    max_interval_in_seconds = 10
    max_staleness_prefix    = 200
  }

  geo_location {
    location          = azurerm_resource_group.example.location
    failover_priority = 0
  }
}
