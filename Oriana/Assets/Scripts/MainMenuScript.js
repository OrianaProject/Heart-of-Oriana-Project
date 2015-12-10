var page_1_0 : Transform; //Main Page
var page_2_0 : Transform; // Play Page
var page_2_1 : Transform; // Solo/Coop Page
var page_3_0 : Transform; // Options Page
var page_3_1 : Transform; // Audio Page
var page_3_2 : Transform; // Video Page
var page_3_3 : Transform; // Controls Page
var page_4_0 : Transform; // Quit Page

var Level : Transform[]; 

var PosA : Transform;
var PosB : Transform;

function Start(){

	changePage("Main");

}

function QuitGame()
{
	Application.Quit();
}

function StartGame(Level : String)
{
	Application.LoadLevel(Level);
}

function changePage(page : String)
{

	page_1_0.transform.position = PosB.transform.position;
	page_2_0.transform.position = PosB.transform.position;
	page_2_1.transform.position = PosB.transform.position;
	page_3_0.transform.position = PosB.transform.position;
	page_3_1.transform.position = PosB.transform.position;
	page_3_2.transform.position = PosB.transform.position;
	page_3_3.transform.position = PosB.transform.position;
	page_4_0.transform.position = PosB.transform.position;
				
	if (page == "Main")
		page_1_0.transform.position = PosA.transform.position;
	if (page == "Play")
		page_2_0.transform.position = PosA.transform.position;
	if (page == "Solo")
		page_2_1.transform.position = PosA.transform.position;
	if (page == "Coop")
		page_2_1.transform.position = PosA.transform.position;
	if (page == "Options")
		page_3_0.transform.position = PosA.transform.position;
	if (page == "Audio")
		page_3_1.transform.position = PosA.transform.position;
	if (page == "Video")
		page_3_2.transform.position = PosA.transform.position;
	if (page == "Controls")
		page_3_3.transform.position = PosA.transform.position;
	if (page == "Quit")
		page_4_0.transform.position = PosA.transform.position;	
	
}

/*
PLAY [2_0]
 |- SOLO [2_1]
     |- CONTINUE
     |- NEW GAME
     |- BACK
 |-	COOP [2_1] <-- MEME PAGE
 	 |- CONTINUE
     |- NEW GAME
     |- BACK
 |-	BACK
 
 --------------------
 
OPTIONS [3]
 |- AUDIO [3_1]
     |- GLOBAL VOLUME
     |- FX VOUME
     |- MUSIC VOLUME
     |- BACK
 |-	VIDEO [3_2]
 	 |- ?
     |- ?
     |- ?
 |- CONTROLS [3_3]
 	 |- ?
     |- ?
 |-	BACK
 
 --------------------
 
QUIT 
 |- MESSAGE [4_0]
*/