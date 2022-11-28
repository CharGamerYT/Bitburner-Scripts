/** @param {NS} ns */
export async function main(ns) {
	const target = "phantasy";
	const moneyStolenPercent = 0.2;

	const totalThreads = Math.floor((ns.getServerMaxRam("home") - ns.getServerUsedRam("home"))/ns.getScriptRam("grow.js"));
	ns.tprint("Total threads available: " + totalThreads);

	while(true) {
		if (ns.getServerMoneyAvailable(target) < ns.getServerMaxMoney(target)) {
			ns.run("grow.js", totalThreads);
			//ns.tprint("Starting grow on " + target);
		} else if (ns.getServerSecurityLevel(target) != ns.getServerMinSecurityLevel(target)) {
			ns.run("weaken.js", totalThreads);
			//ns.tprint("Starting weaken on " + target);
		} else {
			const hackThreads = Math.floor(ns.hackAnalyzeThreads(target, moneyStolenPercent*ns.getServerMoneyAvailable(target)));
			ns.run("hack.js", hackThreads);
			//ns.tprint("Starting hack on " + target);
		}
		await ns.sleep(1);
	}
}
