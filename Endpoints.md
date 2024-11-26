
Endpoint
    path/api/bootcamps
    Returns a list of bootcamp dtos
    JSON:
    bootcamps: 
    {
        name: string
        id: number
        teacher: string
    }

Endpoint
    path/api/bootcamps/topics/{id}
    Id is a valid bootcamp id.
    Returns a list of Ids of Topics/Modules.
    Json:
    //You can map directly on the topics
    topics: 
     {
     }

Endpoint
    path/api/bootcamps/teacher/{id}
    Id is a valid bootcamp id.
    Returns the name of the Teacher for the bootcamp
    Json:
    {
        name : string
    }
