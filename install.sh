#!/bin/bash

# Prompt for domain name and project name
read -p "Enter the domain name [mysite.com]: " domain_name
# Check if the domain name is provided
if [ -z "$domain_name" ]; then
    echo "Domain name cannot be empty. Please run the script again and provide a valid domain name."
    exit 1
fi

read -p "Enter the project name [mysite]: " project_name
# Check if the project name is provided
if [ -z "$project_name" ]; then
    echo "Project name cannot be empty. Please run the script again and provide a valid project name."
    exit 1
fi

# Replace any character other than [a-zA-Z] with dashes, and reduce multiple dashes to a single dash
project_name=$(echo "$project_name" | sed 's/[^a-zA-Z]/-/g; s/-\{2,\}/-/g')

# Define the template and output files
files=(
    "Makefile.template:Makefile"
    "Dockerfile.template:Dockerfile"
    "WSDockerfile.template:WSDockerfile"
    "server/app/package.json.template:server/app/package.json"
    "site/package.json.template:site/package.json"
    "ws/app/package.json.template:ws/app/package.json"
    "config/caddy/Caddyfile.template:config/caddy/Caddyfile"
    "config/docker/.env.template:config/docker/.env"
    "config/docker/docker-compose.yml.template:config/docker/docker-compose.yml"
    "site/app.vue.template:site/app.vue"
)

# Loop through each file, replace placeholders, and remove the template file after processing
for file_pair in "${files[@]}"; do
    template_file="${file_pair%%:*}"
    output_file="${file_pair##*:}"

    if [[ -f "$template_file" ]]; then
        echo "Generating $output_file from $template_file..."
        # Use sed to replace placeholders and create the output file
        sed "s/{{DOMAIN_NAME}}/${domain_name}/g; s/{{PROJECT_NAME}}/${project_name}/g" "$template_file" > "$output_file"
    else
        echo "Template file $template_file not found."
    fi
done

echo "Files generated successfully!"

# Ask if the user wishes to remove the template files
read -p "Do you wish to remove the template files? (yes/no): " remove_templates

# Remove the template files only if the user answered "yes"
if [[ "$remove_templates" == "yes" ]]; then
    for file_pair in "${files[@]}"; do
        template_file="${file_pair%%:*}"

        if [[ -f "$template_file" ]]; then
            rm "$template_file"
            echo "Removed template file $template_file"
        fi
    done
else
    echo "Template files were not removed."
fi

# Parameters for SSL certificates
CERTS_DIR="config/certs"
CERT_PEM_FILE="${CERTS_DIR}/local.cert.pem"
KEY_PEM_FILE="${CERTS_DIR}/local.key.pem"

# Ensure required executables exist
if [[ -z "$(which mkcert)" || -z "$(brew ls --versions nss)" ]]; then
    echo "Requires: mkcert & nss"
    echo
    echo "Run: brew install mkcert nss, then run this script again"
    exit 1
fi

# Install SSL certificates using mkcert
echo
echo "-- Installing mkcert ..."
mkcert -install

mkdir -p "${CERTS_DIR}"

echo "-- Creating and installing local SSL certificates for domain: ${domain_name} + *.${domain_name} ..."
mkcert -cert-file "${CERT_PEM_FILE}" -key-file "${KEY_PEM_FILE}" "${domain_name}" "*.${domain_name}"

echo "-- SSL certificates generated successfully!"
echo
echo "- Now you can run: make build"


