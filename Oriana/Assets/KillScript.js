function OnCollisionEnter2D(col : Collision2D)
{
	col.gameObject.SendMessage("checkHealth", -100);
}