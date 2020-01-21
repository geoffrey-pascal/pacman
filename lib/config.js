var service_host = 'localhost'
var auth_details = ''
var mongo_database = 'pacman'
var mongo_port = '27017'
var use_ssl = false
var validate_ssl = true
var connection_details = ''

if(process.env.MONGODB_SERVICE_HOST) {
    service_host = process.env.MONGODB_SERVICE_HOST
} else if(process.env.MONGO_NAMESPACE_SERVICE_HOST) {
    service_host = process.env.MONGO_NAMESPACE_SERVICE_HOST
}

if(process.env.database_name) {
    mongo_database = process.env.database_name
}

if(process.env.MONGODB_SERVICE_PORT) {
    mongo_port = process.env.MONGODB_SERVICE_PORT
}

if(process.env.MONGO_USE_SSL) {
    if(process.env.MONGO_USE_SSL.toLowerCase() == "true") {
        use_ssl = true
    }
}

if(process.env.MONGO_VALIDATE_SSL) {
    if(process.env.MONGO_VALIDATE_SSL.toLowerCase() == "false") {
        validate_ssl = false
    }
}

if(process.env.username && process.env.password) {
    auth_details = `${process.env.username}:${process.env.password}@`
}

var hosts = service_host.split(',')

for (let i=0; i<hosts.length;i++) {
  connection_details += `${hosts[i]}:${mongo_port},`
}

connection_details = connection_details.replace(/,\s*$/, "");

var database = {
    url: `mongodb://${auth_details}${connection_details}/${mongo_database}`,
    options: {
        readPreference: 'secondaryPreferred'
    }
};

if(process.env.MONGO_REPLICA_SET) {
    database.options.replicaSet = process.env.MONGO_REPLICA_SET
}

if(use_ssl) {
    database.options.ssl = use_ssl
    database.options.sslValidate = validate_ssl
}

exports.database = database;
