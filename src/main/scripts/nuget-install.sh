rm -rf packages/*
nuget restore
mkdir -p Terradue.Tep.Hydrology.WebServer/core
mkdir -p Terradue.Tep.Hydrology.WebServer/modules
mkdir -p Terradue.Tep.Hydrology.WebServer/services
cp -pr packages/**/content/core/** Terradue.Tep.Hydrology.WebServer/core
cp -pr packages/**/content/modules/** Terradue.Tep.Hydrology.WebServer/modules
