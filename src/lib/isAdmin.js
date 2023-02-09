import { PrismaClient } from "@prisma/client";

export async function isAdmin(token) {
	const client = new PrismaClient();
	const response = await client.loginSession.findUnique({
		where: {
			token: token,
		}
	});

	if (!response) {
		return false;
	}
	if (response.date > response.expires) {
		return false;
	}

	return true;
}
