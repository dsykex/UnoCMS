/*----------------------------------------------*/
/* Main Configurations for the site goes here   */
/*----------------------------------------------*/

var Configs = {
    BACKEND_URL: 'https://dsykes.firebaseio.com/',
    isStatic: true,
    
    /*-----   Database Configs  -----*/
    /*-------------------------------*/
    
    //db_host: '<HOSTNAME>',
    //db_name: '<DB_NAME>',
    //db_username: '<DB_USER>',
    //db_password: '<DB_PASSWORD>',

    db: [],
    dbRelations: [],
    editorCols: [],

    modRanks: ['a', 'md'],

    isStrict: [false],
    
    global_data: [
        {set_object: ['unoVersion', 1.0]},
    ],

    textEditor:''
};