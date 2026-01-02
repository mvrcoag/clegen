import { NextRequest, NextResponse } from 'next/server';
import { {{ entity }}Service } from './{{ Entity }}Service';

/**
 * GET /api/{{ entity }}
 * Get all {{ entity }} items
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const item = await {{ entity }}Service.getById(id);
      
      if (!item) {
        return NextResponse.json(
          { error: '{{ Entity }} not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(item);
    }

    const items = await {{ entity }}Service.getAll();
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/{{ entity }}
 * Create new {{ entity }}
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const item = await {{ entity }}Service.create(body);
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/{{ entity }}
 * Update {{ entity }} by id
 */
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const body = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    const item = await {{ entity }}Service.update(id, body);
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/{{ entity }}
 * Delete {{ entity }} by id
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    await {{ entity }}Service.delete(id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
