function OnTriggerEnter2D(coll : Collider2D) {
	if (coll.name == "Player1" || coll.name == "Player2")
	{
		Player1_movement.canMove = false;
		Player2_movement.canMove = false;
	}
}