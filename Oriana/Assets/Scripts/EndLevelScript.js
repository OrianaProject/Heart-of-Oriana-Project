function OnTriggerEnter2D(coll : Collider2D) {
	if (coll.name == "Player1" || coll.name == "Player2")
		Application.LoadLevel("Game2");
}