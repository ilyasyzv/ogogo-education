import Mux from "@mux/mux-node";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

type Params = {
  id: string; // The course ID should be a string
};

const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!
);

export async function GET(req: Request, { params }: { params: { courseId: string } }) {
  console.log("Route params:", params); // Log parameters for debugging

  const { courseId } = params;

  if (!courseId) {
    return new NextResponse("Course ID is required", { status: 400 });
  }

  try {
    const course = await db.course.findUnique({
      where: { id: courseId }, // Ensure this corresponds to the actual field in your database
      include: {
        category: true,
        chapters: true,
      },
    });

    if (!course) {
      return new NextResponse("Course not found", { status: 404 });
    }

    return NextResponse.json(course);
  } catch (error) {
    console.log("[GET_COURSE_BY_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    for (const chapter of course.chapters) {
      if (chapter.muxData) {
        await Video.Assets.del(chapter.muxData.assetId);
      }
    }
    const deletedCourse = await db.course.delete({
      where: {
        id: params.courseId,
      },
    });
    return NextResponse.json(deletedCourse);
  } catch (error) {
    console.log("[COURSE_ID_DELETE]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { courseId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const course = await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
