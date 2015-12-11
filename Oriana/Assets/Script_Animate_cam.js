function OnTriggerEnter2D(col : Collider2D)
{
	if (col.gameObject.tag == "Player")
	{
		col.gameObject.SendMessage("checkHealth", 2);
		Destroy(this.gameObject);
	}
}