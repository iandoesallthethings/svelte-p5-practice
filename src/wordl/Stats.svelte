<script>
	import { stats } from '../stores'

	function winPercentage() {
		return Math.round(($stats.wins / ($stats.wins + $stats.losses)) * 100) || 0
	}
</script>

<div class="flex flex-col my-2">
	<h3>Stats</h3>
	<span> Wins: {$stats.wins} </span>
	<span> Losses: {$stats.losses} </span>
	<span> Streak: {$stats.streak} </span>
	<span> Win Percentage: {winPercentage()}% </span>
</div>
