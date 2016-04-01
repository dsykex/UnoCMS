/*----------------------------------------------*/
/* Main Configurations for the site goes here   */
/*----------------------------------------------*/

var Configs = {
    //Change this to your firebase url

    BACKEND_URL: 'https://dsykes.firebaseio.com/',
    isStatic: false,

    /*-----   Database Configs  -----*/
    /*-------------------------------*/

    db_host: '127.0.0.1',
    db_name: 'mydb',
    db_username: 'root',
    db_password: 'maxwel123',

    db: ['chats', 'users'],
    dbRelations: [],
    editorCols: [],

    modRanks: ['a', 'md'],

    isStrict: [false],

    global_data: [
        {set_object: ['unoVersion', 1.0]},
    ],
};